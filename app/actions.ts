/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import {parseWithZod} from '@conform-to/zod'
import { postSchema, siteCreationSchema } from "./utils/zodSchemas";
import { requireAuth} from "./utils/auth";
import { stripe } from "./utils/stripe";
import prisma from "./utils/db";

export async function CreateSiteAction(prevState: any, formData: FormData) {
    const userId = await requireAuth()

    const [subStatus, sites] = await Promise.all([
        prisma.subscription.findUnique({
            where:{
                userId: userId
            },
            select:{
                status:true
            }
        }),
        prisma.site.findMany({
            where:{
                userId: userId
            },
        })
    ])

    if(!subStatus || subStatus.status !== 'active'){
        if(sites.length <1){
            // Allow user to create one site
            await createSite()
        } else{
            //Do not allow, User Has already one site 
            return redirect('/dashboard/pricing')
        }
    } else if(subStatus.status === 'active'){
        // User has an active plan 
        await createSite()
    }
    
   async function createSite() {
        const submission = await parseWithZod(formData,{
            schema: siteCreationSchema({
                async isSubdirectoryUnique() {
                    const existingSubDir = await prisma.site.findUnique({
                        where:{
                            subdirectory: formData.get('subdirectory') as string
                        }
                    })
                    return !existingSubDir
                },
            }),
            async: true
        })

        if(submission.status !== 'success'){
            return submission.reply()
        }

        await prisma.site.create({
            data:{
                description: submission.value.description,
                name: submission.value.name,
                subdirectory: submission.value.subdirectory,
                userId: userId
            }
        })

    }
    return redirect('/dashboard/sites')
}

export async function CreatePostAction(prevState: any, formData: FormData) {
    const userId = await requireAuth()

    const submission = parseWithZod(formData,{
        schema: postSchema
    })

    if(submission.status !== 'success'){
        return submission.reply()
    }

    await prisma.post.create({
        data:{
            title: submission.value.title,
            smallDescription: submission.value.smallDescription,
            slug: submission.value.slug,
            articleContent: JSON.parse(submission.value.articleContent),
            image: submission.value.coverImage,
            userId: userId,
            siteId: formData.get("siteId") as string
        }
    })

    return redirect(`/dashboard/sites/${formData.get('siteId')}`)
}

export async function EditPostAction(prevState: any, formData: FormData) {
    const userId = await requireAuth()

    const submission = parseWithZod(formData,{
        schema: postSchema
    })

    if(submission.status !== 'success'){
        return submission.reply()
    }

    await prisma.post.update({
        where:{
            userId: userId,
            id: formData.get('articleId') as string,
        },
        data:{
            title: submission.value.title,
            smallDescription: submission.value.smallDescription,
            slug: submission.value.slug,
            articleContent: JSON.parse(submission.value.articleContent),
            image: submission.value.coverImage,

        }
    })

    return redirect(`/dashboard/sites/${formData.get('siteId')}`)
}

// export async function DeletePostAction(prevState: any, formData: FormData) {
export async function DeletePostAction( formData: FormData) {
    const userId = await requireAuth()

    await prisma.post.delete({
        where:{
            userId: userId,
            id: formData.get('articleId') as string,
        },
    })

    return redirect(`/dashboard/sites/${formData.get('siteId')}`)
}


export async function UpdateSiteImageAction(formData: FormData) {
    const userId = await requireAuth()

    await prisma.site.update({
        where:{
            userId: userId,
            id: formData.get("siteId") as string

        },
        data:{
            imageUrl: formData.get('imageUrl') as string
        }
    })

    return redirect(`/dashboard/sites/${formData.get('siteId')}`)
}

export async function DeleteSiteAction(formData: FormData) {
    const userId = await requireAuth()

    await prisma.site.delete({
        where:{
            userId: userId,
            id: formData.get("siteId") as string

        },
    })

    return redirect(`/dashboard/sites`)
}

export async function CreateSubscription() {
    const userId = await requireAuth()

    let stripeUserId = await prisma.user.findUnique({
        where:{
            id: userId
        },
        select:{
            customerId: true,
            email: true,
            firstName: true,
        }
    })

    if(!stripeUserId?.customerId){
        const stripeCustomer = await stripe.customers.create({
            email: stripeUserId?.email,
            name: stripeUserId?.firstName,
        })

        stripeUserId = await prisma.user.update({
            where:{
                id: userId,
            },
            data:{
                customerId: stripeCustomer.id
            }
        })
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeUserId.customerId as string,
        mode: 'subscription',
        billing_address_collection:'auto',
        payment_method_types:['card','ideal'],
        line_items:[
            {
                price: process.env.STRIPE_PRICE_ID, 
                quantity:1
            }
        ],
        customer_update:{
            address:'auto',
            name: 'auto'
        },
        success_url:process.env.NODE_ENV === 'production' ? `${process.env.SITE_URL}/dashboard/payment/success` : 'http://localhost:3000/dashboard/payment/success',
        cancel_url:process.env.NODE_ENV === 'production' ? `${process.env.SITE_URL}/dashboard/payment/cancelled` : 'http://localhost:3000/dashboard/payment/cancelled',
    })

    return redirect(session.url as string)
}