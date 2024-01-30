import { z } from 'zod'

const envSchema = z.object({
    NEXT_PUBLIC_DOMAIN: z.string().url()
})

export const env = envSchema.parse({ NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN });