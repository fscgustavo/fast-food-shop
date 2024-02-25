import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Search, X } from "lucide-react";

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
	return (
		<TableRow>
			<TableCell>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">Order&apos;s details</span>
						</Button>
					</DialogTrigger>
					<OrderDetails />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">
				{order.orderId}
			</TableCell>
			<TableCell className="text-muted-foreground">
				{order.createdAt ? formatDistanceToNow(order.createdAt) : ""}
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">
				{order.total.toLocaleString("en-US", {
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
				<Button variant="ghost" size="xs">
					<X className="h-3 w-3 mr-2" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
