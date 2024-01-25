import type { Metadata } from "next";

import { SignInForm } from "./SignInForm";

export const metadata: Metadata = {
	title: "Login | pizza.shop",
};

export default function SignIn() {
	return <SignInForm />;
}
