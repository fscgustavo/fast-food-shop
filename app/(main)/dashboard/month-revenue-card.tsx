"use client";

import { DollarSign } from "lucide-react";
import useSWR from "swr";

import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthRevenueCard() {
	const { data: monthRevenue } = useSWR(
		["metrics", "month-revenue"],
		getMonthRevenue
	);

	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Total revenue (monthly)
				</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthRevenue && (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{(monthRevenue.receipt / 100).toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
							})}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthRevenue.diffFromLastMonth >= 0 ? (
								<>
									<span className="text-emerald-500 dark:text-emerald-400">
										+{monthRevenue.diffFromLastMonth}%
									</span>{" "}
									compared to the last month
								</>
							) : (
								<>
									<span className="text-rose-500 dark:text-rose-400">
										{monthRevenue.diffFromLastMonth}%
									</span>{" "}
									compared to the last month
								</>
							)}
						</p>
					</>
				)}
			</CardContent>
		</Card>
	);
}
