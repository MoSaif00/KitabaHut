import { conformZodMessage } from '@conform-to/zod';
import {z} from 'zod'

export const siteSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(200),
    subdirectory: z.string().min(1).max(70),
})

export const postSchema = z.object({
    title: z.string().min(1).max(100),
    slug: z.string().min(1).max(190),
    coverImage: z.string().min(1),
    smallDescription: z.string().min(1).max(200),
    articleContent: z.string().min(1),
})


export function siteCreationSchema(options?:{
    isSubdirectoryUnique:()=> Promise<boolean>;
}){
    return z.object({
        subdirectory: z
        .string()
        .min(1)
        .max(70)
        .regex(/^[a-z]+$/, "Use only lowercase letters")
        .transform((v) => v.toLocaleLowerCase())
        .pipe(
            z.string().superRefine((email, ctx)=>{
                if(typeof options?.isSubdirectoryUnique !== "function"){
                    ctx.addIssue({
                        code: 'custom',
                        message: conformZodMessage.VALIDATION_UNDEFINED,
                        fatal:true
                    });
                    return
                }

                return options.isSubdirectoryUnique().then((isUnique)=>{
                    if(!isUnique){
                        ctx.addIssue({
                            code:'custom',
                            message:'Subdirectory is already taken'
                        })
                    }
                })
            })
        ),
        name: z.string().min(1).max(50),
        description: z.string().min(1).max(200),
    })
}