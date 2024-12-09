import {z} from 'zod'

export const siteSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(200),
    subdirectory: z.string().min(1).max(70),
})