import { Pizza } from "lucide-react";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-screen grid-cols-2">
			<div className="flex h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground justify-between">
				<div className="flex items-center gap-3 text-lg font-medium text-foreground">
					<Pizza className="h-5 w-5" />
					<span className="font-semibold">Pizza Shop</span>
				</div>
				<footer className="text-sm">
					Partner Dashboard &copy; Pizza Shop - {new Date().getFullYear()}
				</footer>
			</div>
			<div className="flex flex-col items-center justify-center relative">
				{children}
			</div>
		</div>
	);
}
