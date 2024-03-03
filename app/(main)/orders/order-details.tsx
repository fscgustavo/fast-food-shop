import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import useSWR from "swr";

import { getOrderDetails } from "@/api/get-order-details";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { OrderStatus } from "./order-status";

type OrderDetailsProps = {
	id: string;
	open: boolean;
};

export function OrderDetails({ id, open }: OrderDetailsProps) {
	const { data: details } = useSWR(open ? `/orders/${id}` : null, () =>
		getOrderDetails({ orderId: id })
	);

	const totalPrice = details?.data?.totalInCents ?? 0 / 100;

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Order: {id}</DialogTitle>
				<DialogDescription>Order Details</DialogDescription>
			</DialogHeader>
			{!details?.data ? null : (
				<div className="space-y-6">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-muted-foreground">Status</TableCell>
								<TableCell className="flex justify-end">
									<OrderStatus status={details.data.status} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Client</TableCell>
								<TableCell className="flex justify-end">
									{details.data.customer.name}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Cellphone
								</TableCell>
								<TableCell className="flex justify-end">
									{details.data.customer.phone ?? "Not informed"}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">E-mail</TableCell>
								<TableCell className="flex justify-end">
									{details.data.customer.email}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Done</TableCell>
								<TableCell className="flex justify-end">
									{details.data.createdAt
										? formatDistanceToNow(details.data.createdAt, {
												locale: enUS,
												addSuffix: true,
											})
										: ""}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Product</TableHead>
								<TableHead className="text-right">Qtd.</TableHead>
								<TableHead className="text-right">Price</TableHead>
								<TableHead className="text-right">Subtotal</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{details.data.orderItems.map((item) => {
								const prices = {
									unity: item.priceInCents / 100,
									product: (item.priceInCents * item.quantity) / 100,
								};

								return (
									<TableRow key={item.id}>
										<TableCell>{item.product.name}</TableCell>
										<TableCell className="text-right">
											{item.quantity}
										</TableCell>
										<TableCell className="text-right">
											{prices.unity.toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</TableCell>
										<TableCell className="text-right">
											{prices.product.toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>Order Total</TableCell>
								<TableCell className="text-right font-medium">
									{totalPrice.toLocaleString("en-US", {
										style: "currency",
										currency: "USD",
									})}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			)}
		</DialogContent>
	);
}
