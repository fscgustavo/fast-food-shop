import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthRevenueCard() {
	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Total revenue (monthly)
				</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				<span className="text-2xl font-bold tracking-tight">R$ 1248,60</span>
				<p className="text-xs text-muted-foreground">
					<span className="text-emerald-500 dark:text-emerald-400">+2%</span>{" "}
					compared to the last month
				</p>
			</CardContent>
		</Card>
	);
}