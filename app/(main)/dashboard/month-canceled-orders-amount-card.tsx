"use client";

import { DollarSign } from "lucide-react";
import useSWR from "swr";

import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthCanceledOrdersAmountCard() {
	const { data: monthCanceledOrdersAmount } = useSWR(
		["metrics", "canceled-orders-amount"],
		getMonthCanceledOrdersAmount
	);

	return (
		<Card>
			<CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">
					Cancellations (monthly)
				</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthCanceledOrdersAmount && (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{monthCanceledOrdersAmount.amount.toLocaleString("en-US")}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
								<>
									<span className="text-emerald-500 dark:text-emerald-400">
										{monthCanceledOrdersAmount.diffFromLastMonth}%
									</span>{" "}
									em relação ao mês passado
								</>
							) : (
								<>
									<span className="text-rose-500 dark:text-rose-400">
										+{monthCanceledOrdersAmount.diffFromLastMonth}%
									</span>{" "}
									em relação ao mês passado
								</>
							)}
						</p>
					</>
				)}
			</CardContent>
		</Card>
	);
}
