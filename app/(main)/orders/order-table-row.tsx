import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { approveOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";
import { Order } from "@/api/get-orders";
import { OrderDetails } from "@/app/(main)/orders/order-details";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import { OrderStatus } from "./order-status";

type OrderTableRowProps = {
	order: Order;
};

function mutateOrders() {
	mutate((key) => key && key[0].startsWith("orders"));
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const isCancelDisabled = !["pending", "processing"].includes(order.status);

	const { trigger: cancelOrderFn, isMutating: isCancelingOrder } =
		useSWRMutation("orders", () => cancelOrder({ orderId: order.orderId }), {
			onSuccess: mutateOrders,
		});

	const { trigger: approveOrderFn, isMutating: isApprovingOrder } =
		useSWRMutation("orders", () => approveOrder({ orderId: order.orderId }), {
			onSuccess: mutateOrders,
		});

	const { trigger: dispatchOrderFn, isMutating: isDispatchingOrder } =
		useSWRMutation("orders", () => dispatchOrder({ orderId: order.orderId }), {
			onSuccess: mutateOrders,
		});

	const { trigger: deliverOrderFn, isMutating: isDeliveringOrder } =
		useSWRMutation("orders", () => deliverOrder({ orderId: order.orderId }), {
			onSuccess: mutateOrders,
		});

	async function handleCancelClick() {
		await cancelOrderFn().catch(() => null);
	}

	async function handleApproveClick() {
		await approveOrderFn().catch(() => null);
	}

	async function handleDispatchClick() {
		await dispatchOrderFn().catch(() => null);
	}

	async function handleDeliverClick() {
		await deliverOrderFn().catch(() => null);
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
				{order.status === "pending" && (
					<Button
						variant="outline"
						size="xs"
						onClick={handleApproveClick}
						disabled={isApprovingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Approve
					</Button>
				)}
				{order.status === "processing" && (
					<Button
						variant="outline"
						size="xs"
						onClick={handleDispatchClick}
						disabled={isDispatchingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Delivering
					</Button>
				)}
				{order.status === "delivering" && (
					<Button
						variant="outline"
						size="xs"
						onClick={handleDeliverClick}
						disabled={isDeliveringOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Delivered
					</Button>
				)}
			</TableCell>
			<TableCell>
				<Button
					variant="ghost"
					size="xs"
					onClick={handleCancelClick}
					disabled={isCancelDisabled || isCancelingOrder}
				>
					<X className="h-3 w-3 mr-2" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
