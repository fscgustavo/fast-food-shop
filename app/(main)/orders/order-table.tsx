"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { z } from "zod";

import { getOrders } from "@/api/get-orders";
import { Pagination } from "@/components/pagination";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { OrderTableFilters } from "./order-table-filters";
import { OrderTableRow } from "./order-table-row";

export function OrderTable() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const orderId = searchParams.get("orderId");
	const customerName = searchParams.get("customerName");
	const status = searchParams.get("status");

	const currentPageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(searchParams.get("page") ?? 1);

	const { data: result } = useSWR(
		["orders", currentPageIndex, orderId, customerName, status],
		() =>
			getOrders({
				pageIndex: currentPageIndex.toString(),
				orderId,
				customerName,
				status,
			})
	);

	function handlePaginate(pageIndex: number) {
		const newSearchParams = new URLSearchParams(searchParams.toString());

		newSearchParams.set("page", String(pageIndex + 1));

		router.push(`/orders?${newSearchParams.toString()}`);
	}

	return (
		<div className="space-y-2.5">
			<OrderTableFilters />
			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-16"></TableHead>
							<TableHead className="w-[8.75rem]">Identifier</TableHead>
							<TableHead className="w-[11.25rem]">Done Since</TableHead>
							<TableHead className="w-[8.75rem]">Status</TableHead>
							<TableHead>Client</TableHead>
							<TableHead className="w-[8.75rem]">Order&apos;s Total</TableHead>
							<TableHead className="w-[10.25rem]"></TableHead>
							<TableHead className="w-[8.25rem]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result?.data?.orders.map((order, i) => {
							return <OrderTableRow order={order} key={i} />;
						})}
					</TableBody>
				</Table>
			</div>
			{result?.data && (
				<Pagination
					onPageChange={handlePaginate}
					pageIndex={result.data.meta.pageIndex}
					totalCount={result.data.meta.totalCount}
					perPage={result.data.meta.perPage}
				/>
			)}
		</div>
	);
}
