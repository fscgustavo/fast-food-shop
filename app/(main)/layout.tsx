"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

import { Header } from "@/components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const router = useRouter();

	return (
		<SWRConfig
			value={{
				onError(error) {
					if (error.message.toLowerCase().includes("unauthorized")) {
						router.replace("/sign-in");
					}
				},
			}}
		>
			<div className="flex min-h-screen flex-col antialiased">
				<Header />
				<div className="flex flex-1 flex-col gap-4 p-8 pt-6">{children}</div>
			</div>
		</SWRConfig>
	);
}
