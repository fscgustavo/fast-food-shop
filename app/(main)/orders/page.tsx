import { Metadata } from "next";

import { OrderTable } from "./order-table";

export const metadata: Metadata = {
	title: "Orders | Pizza Shop",
};

export default function Orders() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
			<OrderTable />
		</div>
	);
}
