import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<section>
			<h1>Auth Layout</h1>
			{children}
		</section>
	);
}
