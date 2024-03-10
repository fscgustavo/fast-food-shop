"use client";

import { Utensils } from "lucide-react";
import useSWR from "swr";

import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthOrdersAmountCard() {
	const { data: monthOrdersAmount } = useSWR(
		["metrics", "month-orders-amount"],
		getMonthRevenue
	);

	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Orders (monthly)
				</CardTitle>
				<Utensils className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthOrdersAmount && (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{monthOrdersAmount.receipt.toLocaleString("pt-BR")}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthOrdersAmount.diffFromLastMonth >= 0 ? (
								<>
									<span className="text-emerald-500 dark:text-emerald-400">
										+{monthOrdersAmount.diffFromLastMonth}%
									</span>{" "}
									compared to last month
								</>
							) : (
								<>
									<span className="text-rose-500 dark:text-rose-400">
										{monthOrdersAmount.diffFromLastMonth}%
									</span>{" "}
									compared to last month
								</>
							)}
						</p>
					</>
				)}
			</CardContent>
		</Card>
	);
}
