"use server";

import { redirect } from "next/navigation";
import {parseWithZod} from '@conform-to/zod'
import { postSchema, siteCreationSchema, siteSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { requireUser } from "./utils/requireUser";
import { stripe } from "./utils/stripe";

export async function CreateSiteAction(prevState: any, formData: FormData) {
    const user = await requireUser()

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

    const response = await prisma.site.create({
        data:{
            description: submission.value.description,
            name: submission.value.name,
            subdirectory: submission.value.subdirectory,
            userId: user.id
        }
    })

    return redirect('/dashboard/sites')
}

export async function CreatePostAction(prevState: any, formData: FormData) {
    const user = await requireUser()

    const submission = parseWithZod(formData,{
        schema: postSchema
    })

    if(submission.status !== 'success'){
        return submission.reply()
    }

    const response = await prisma.post.create({
        data:{
            title: submission.value.title,
            smallDescription: submission.value.smallDescription,
            slug: submission.value.slug,
            articleContent: JSON.parse(submission.value.articleContent),
            image: submission.value.coverImage,
            userId: user.id,
            siteId: formData.get("siteId") as string
        }
    })

    return redirect(`/dashboard/sites/${formData.get('siteId')}`)
}

export async function EditPostAction(prevState: any, formData: FormData) {
    const user = await requireUser()

    const submission = parseWithZod(formData,{
        schema: postSchema
    })

    if(submission.status !== 'success'){
        return submission.reply()
    }

    const response = await prisma.post.update({
        where:{
            userId: user.id,
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
    const user = await requireUser()

    const response = await prisma.post.delete({
        where:{
            userId: user.id,
            id: formData.get('articleId') as string,
        },
    })

    return redirect(`/dashboard/sites/${formData.get('siteId')}`)
}


export async function UpdateSiteImageAction(formData: FormData) {
    const user = await requireUser()

    const response = await prisma.site.update({
        where:{
            userId: user.id,
            id: formData.get("siteId") as string

        },
        data:{
            imageUrl: formData.get('imageUrl') as string
        }
    })

    return redirect(`/dashboard/sites/${formData.get('siteId')}`)
}

export async function DeleteSiteAction(formData: FormData) {
    const user = await requireUser()

    const response = await prisma.site.delete({
        where:{
            userId: user.id,
            id: formData.get("siteId") as string

        },
    })

    return redirect(`/dashboard/sites`)
}

export async function CreateSubscription() {
    const user = await requireUser()

    let stripeUserId = await prisma.user.findUnique({
        where:{
            id: user.id
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
                id: user.id,
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
        customer_update:{
            address:'auto',
            name: 'auto'
        },
        success_url:'http://localhost:3000/payment/success',
        cancel_url:'http://localhost:3000/payment/cancelled',
        line_items:[
            {
                
            }
        ]
    })
}