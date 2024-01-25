"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "./actions";

export function SignInForm() {
	async function loginAction(formData: FormData) {
		try {
			await login(formData);

			toast.success("Enviamos um link de autenticação para seu e-mail.", {
				action: {
					label: "Reenviar",
					onClick: async () => {
						await loginAction(formData);
					},
				},
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	}

	const { pending } = useFormStatus();

	return (
		<div className="p-8">
			<Button asChild variant="ghost" className="absolute right-8 top-8">
				<Link href="/sign-up">New restaurant</Link>
			</Button>
			<div className="w-[21.875rem] flex flex-col justify-center gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Access dashboard
					</h1>
					<p className="text-sm text-muted-foreground">
						Monitor your sales through the partner dashboard!
					</p>
				</div>
				<form action={loginAction} className="space-y-4" noValidate>
					<div className="space-y-2">
						<Label htmlFor="email">E-mail</Label>
						<Input id="email" type="email" name="email" />
					</div>
					<Button type="submit" className="w-full" disabled={pending}>
						Access dashboard
					</Button>
				</form>
			</div>
		</div>
	);
}
