"use server";
import { z } from "zod";

const signInForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email({ message: "Informe um e-mail válido" }),
});

export async function register(formData: FormData) {

    const validatedFields = signInForm.safeParse({
        restaurantName: formData.get("restaurantName"),
        managerName: formData.get("managerName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        const formattedError = validatedFields.error.format();


        throw new Error(formattedError.email?._errors[0])
    }



    await new Promise((resolve) => setTimeout(resolve, 2000))
}