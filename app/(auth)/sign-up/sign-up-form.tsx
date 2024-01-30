"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { register } from "./actions";

export function SignUpForm() {
	const router = useRouter();

	async function registerAction(formData: FormData) {
		try {
			await register(formData);

			toast.success("Restaurant successfully registered!", {
				action: {
					label: "Login",
					onClick: () => {
						router.push(`/sign-in?email=${formData.get("email")}`);
					},
				},
			});
		} catch (error: any) {
			toast.error(
				"An error occurred while registering the restaurant. Please try again later."
			);
		}
	}

	const { pending } = useFormStatus();

	return (
		<div className="p-8">
			<Button asChild variant="ghost" className="absolute right-8 top-8">
				<Link href="/sign-in">Log In</Link>
			</Button>
			<div className="w-[21.875rem] flex flex-col justify-center gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Create new free account
					</h1>
					<p className="text-sm text-muted-foreground">
						Be a partner and start your sales!
					</p>
				</div>
				<form action={registerAction} className="space-y-4" noValidate>
					<div className="space-y-2">
						<Label htmlFor="email">Restaurant Name</Label>
						<Input id="restaurant-name" name="restaurant-name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Name</Label>
						<Input id="name" name="manager-name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">E-mail</Label>
						<Input id="email" type="email" name="email" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Cellphone</Label>
						<Input id="phone" type="tel" name="phone" />
					</div>
					<Button type="submit" className="w-full" disabled={pending}>
						Complete Registration
					</Button>
					<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
						By continuing, you agree to our{" "}
						<a href="" className="underline underline-offset-4">
							Terms of Service
						</a>{" "}
						and{" "}
						<a href="" className="underline underline-offset-4">
							Privacy Policies.
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}
