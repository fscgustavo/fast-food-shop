"use server";
import { z } from "zod";

const signInForm = z.object({
    email: z.string().email({ message: "Informe um e-mail válido" }),
});

export async function login(formData: FormData) {

    const validatedFields = signInForm.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        const formattedError = validatedFields.error.format();


        throw new Error(formattedError.email?._errors[0])
    }



    await new Promise((resolve) => setTimeout(resolve, 2000))
}