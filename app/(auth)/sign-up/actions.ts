"use server";
import { z } from "zod";

import { env } from "@/env";

const signInForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email({ message: "Enter a valid email address" }),
});

export async function register(formData: FormData) {

    const validatedFields = signInForm.safeParse({
        restaurantName: formData.get("restaurant-name"),
        managerName: formData.get("manager-name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        throw new Error("The form was not filled correctly.")
    }

    await fetch(`${env.NEXT_PUBLIC_DOMAIN}/restaurants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
    })
}