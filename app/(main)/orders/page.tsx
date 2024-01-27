import { Metadata } from "next";

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

export const metadata: Metadata = {
	title: "Orders | Pizza Shop",
};

export default function Orders() {
	return (
		<>
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

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
									<TableHead className="w-[8.75rem]">
										Order&apos;s Total
									</TableHead>
									<TableHead className="w-[10.25rem]"></TableHead>
									<TableHead className="w-[8.25rem]"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Array.from({ length: 10 }).map((_, i) => {
									return <OrderTableRow key={i} />;
								})}
							</TableBody>
						</Table>
					</div>
					<Pagination pageIndex={0} totalCount={105} perPage={10} />
				</div>
			</div>
		</>
	);
}
