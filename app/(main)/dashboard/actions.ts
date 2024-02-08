import { z, ZodError } from "zod";

import { fetcher } from "@/utils/fetcher";

const updateProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
});

export async function updateProfile(formData: FormData) {
    try {
        const validatedFields = updateProfileSchema.parse({
            name: formData.get("name"),
            description: formData.get("description")
        })


        await fetcher('/profile', {
            method: 'PUT',
            body: {
                name: validatedFields.name,
                description: validatedFields.description,
            }
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return error.format()
        }

        return error
    }
}