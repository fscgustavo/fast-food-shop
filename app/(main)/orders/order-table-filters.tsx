import { Search, X } from "lucide-react";

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
	return (
		<form className="flex items-center gap-2">
			<span className="text-sm font-semibold">Filters:</span>
			<Input
				aria-label="Client's Name"
				placeholder="Client's Name"
				className="h-8 w-80"
			/>
			<Select>
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
			<Button type="button" variant="outline" size="xs">
				<X className="mr-2 h-4 w-4" />
				Remove filters
			</Button>
		</form>
	);
}
