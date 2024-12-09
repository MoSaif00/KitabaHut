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