import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export type NavLinkProps = LinkProps & { children: ReactNode };

export function NavLink(props: NavLinkProps) {
	const pathname = usePathname();

	return (
		<Link
			data-current={pathname === props.href}
			className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
			{...props}
		/>
	);
}
