import { ArrowRight, Search, X } from "lucide-react";

import { OrderDetails } from "@/components/order-details";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

type OrderTableRowProps = {};

export function OrderTableRow(props: OrderTableRowProps) {
	return (
		<TableRow {...props}>
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
				12490u13085u2jsa
			</TableCell>
			<TableCell className="text-muted-foreground">15 min ago</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-slate-400" />
					<span className="font-medium text-muted-foreground">Pending</span>
				</div>
			</TableCell>
			<TableCell className="font-medium">Diego Schell Fernandes</TableCell>
			<TableCell className="font-medium">R$ 149,90</TableCell>
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
