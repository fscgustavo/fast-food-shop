"use client";

import { useMemo } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import useSWR from "swr";
import colors from "tailwindcss/colors";

import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function RevenueChart() {
	const { data: dailyRevenueInPeriod } = useSWR(
		["metrics", "revenue-in-period"],
		() => getDailyRevenueInPeriod()
	);

	const chartData = useMemo(() => {
		return dailyRevenueInPeriod?.map((chartItem) => {
			return {
				date: chartItem.date,
				receipt: chartItem.receipt / 100,
			};
		});
	}, [dailyRevenueInPeriod]);

	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">
						Revenue during this period
					</CardTitle>
					<CardDescription>Daily revenue during this period</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				{chartData && (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart data={chartData} style={{ fontSize: 12 }}>
							<XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
							<YAxis
								stroke="#888"
								axisLine={false}
								tickLine={false}
								width={80}
								tickFormatter={(value: number) =>
									value.toLocaleString("en-US", {
										style: "currency",
										currency: "USD",
									})
								}
							/>
							<CartesianGrid className="stroke-muted" />
							<Line
								stroke={colors.violet[500]}
								type="linear"
								strokeWidth={2}
								dataKey="receipt"
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</CardContent>
		</Card>
	);
}
