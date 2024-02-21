import type { Metadata } from "next";
import { Suspense } from "react";

import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
	title: "Login | pizza.shop",
};

export default function SignIn() {
	return (
		<Suspense>
			<SignInForm />
		</Suspense>
	);
}
