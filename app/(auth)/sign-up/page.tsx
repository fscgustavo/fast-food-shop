import type { Metadata } from "next";

import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = {
	title: "Register | pizza.shop",
};

export default function SignIn() {
	return <SignUpForm />;
}
