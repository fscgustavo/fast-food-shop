import { Order } from "@/api/get-orders";

type OrderStatusProps = Pick<Order, "status">;

export function OrderStatus({ status }: OrderStatusProps) {
	return (
		<div className="flex items-center gap-2">
			<span
				className="h-2 w-2 rounded-full bg-amber-500 data-[status=pending]:bg-slate-400 data-[status=canceled]:bg-rose-500 data-[status=delivered]:bg-emerald-500"
				data-status={status}
			/>
			<span className="font-medium text-muted-foreground">{status}</span>
		</div>
	);
}
