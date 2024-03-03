import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { cancelOrder } from "@/api/cancel-order";
import { Order } from "@/api/get-orders";
import { OrderDetails } from "@/app/(main)/orders/order-details";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import { OrderStatus } from "./order-status";

type OrderTableRowProps = {
	order: Order;
};

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const isCancelDisabled = !["pending", "processing"].includes(order.status);

	const { trigger: cancelOrderFn, isMutating: isCancellationLoading } =
		useSWRMutation("orders", () => cancelOrder({ orderId: order.orderId }), {
			onSuccess: () => {
				mutate((key) => key && key[0].startsWith("orders"));
			},
		});

	async function handleCancelClick() {
		await cancelOrderFn().catch(() => null);
	}

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">Order&apos;s details</span>
						</Button>
					</DialogTrigger>
					<OrderDetails id={order.orderId} open={isDetailsOpen} />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">
				{order.orderId}
			</TableCell>
			<TableCell className="text-muted-foreground">
				{order.createdAt
					? formatDistanceToNow(order.createdAt, {
							locale: enUS,
							addSuffix: true,
						})
					: ""}
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">
				{(order.total / 100).toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				})}
			</TableCell>
			<TableCell>
				<Button variant="outline" size="xs">
					<ArrowRight className="h-3 w-3 mr-2" />
					Aprovar
				</Button>
			</TableCell>
			<TableCell>
				<Button
					variant="ghost"
					size="xs"
					onClick={handleCancelClick}
					disabled={isCancelDisabled || isCancellationLoading}
				>
					<X className="h-3 w-3 mr-2" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
