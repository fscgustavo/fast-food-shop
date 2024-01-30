"use server";
import { z } from "zod";

import { env } from "@/env";

const signInForm = z.object({
    email: z.string().email({ message: "Enter a valid email address" }),
});

export async function login(formData: FormData) {
    const validatedFields = signInForm.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        const formattedError = validatedFields.error.format();


        throw new Error(formattedError.email?._errors[0])
    }

    await fetch(`${env.NEXT_PUBLIC_DOMAIN}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: validatedFields.data.email }),
    })
}