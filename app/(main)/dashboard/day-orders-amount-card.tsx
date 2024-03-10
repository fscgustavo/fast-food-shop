"use client";

import { Utensils } from "lucide-react";
import useSWR from "swr";

import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DayOrdersAmountCard() {
	const { data } = useSWR(["metrics", "day-orders-amount"], getDayOrdersAmount);

	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Orders (daily)
				</CardTitle>
				<Utensils className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			{data && (
				<CardContent className="space-y-1">
					<span className="text-2xl font-bold tracking-tight">
						{data.amount.toLocaleString("en-US")}
					</span>
					<p className="text-xs text-muted-foreground">
						{data.diffFromYesterday >= 0 ? (
							<>
								<span className="text-emerald-500 dark:text-emerald-400">
									+{data.diffFromYesterday}%
								</span>{" "}
								compared to yesterday
							</>
						) : (
							<>
								<span className="text-rose-500 dark:text-rose-400">
									{data.diffFromYesterday}%
								</span>{" "}
								compared to yesterday
							</>
						)}
					</p>
				</CardContent>
			)}
		</Card>
	);
}
