import type { Metadata } from "next";

import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
	title: "Login | pizza.shop",
};

export default function SignIn() {
	return <SignInForm />;
}
