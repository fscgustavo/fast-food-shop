import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pizza Shop",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster richColors />
				</ThemeProvider>
			</body>
		</html>
	);
}
