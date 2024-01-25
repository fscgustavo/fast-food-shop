import type { Metadata } from "next";

import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
	title: "Register | pizza.shop",
};

export default function SignIn() {
	return <SignUpForm />;
}
