import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function OrderTableFilters() {
	const searchParams = useSearchParams();
	const router = useRouter();

	function filterAction(formData: FormData) {
		const params = new URLSearchParams();

		const filterData = {
			customerName: formData.get("customerName")?.toString(),
			status: formData.get("status")?.toString(),
			orderId: formData.get("orderId")?.toString(),
		};

		filterData.customerName &&
			params.set("customerName", filterData.customerName);
		filterData.orderId && params.set("orderId", filterData.orderId);
		filterData.status &&
			filterData.status !== "all" &&
			params.set("status", filterData.status);

		params.set("page", "1");

		router.push(`/orders?${params.toString()}`);
	}

	function onFilterReset() {
		router.push("/orders");
	}

	return (
		<form action={filterAction} className="flex items-center gap-2">
			<span className="text-sm font-semibold">Filters:</span>
			<Input
				name="customerName"
				aria-label="Client's Name"
				placeholder="Client's Name"
				className="h-8 w-80"
				defaultValue={searchParams.get("customerName") ?? ""}
			/>
			<Input
				name="orderId"
				aria-label="Order's ID"
				placeholder="Order's ID"
				className="h-8 w-80"
				defaultValue={searchParams.get("orderId") ?? ""}
			/>
			<Select name="status" defaultValue={searchParams.get("status") ?? ""}>
				<SelectTrigger className="h-8 w-[180px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Todos status</SelectItem>
					<SelectItem value="pending">Pending</SelectItem>
					<SelectItem value="canceled">Canceled</SelectItem>
					<SelectItem value="processing">Processing</SelectItem>
					<SelectItem value="delivering">Delivering</SelectItem>
					<SelectItem value="delivered">Delivered</SelectItem>
				</SelectContent>
			</Select>
			<Button type="submit" variant="secondary" size="xs">
				<Search className="mr-2 h-4 w-4" />
				Filter results
			</Button>
			<Button type="reset" variant="outline" size="xs" onClick={onFilterReset}>
				<X className="mr-2 h-4 w-4" />
				Remove filters
			</Button>
		</form>
	);
}
