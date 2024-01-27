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

export function OrderDetails() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Order: 389438912asasf</DialogTitle>
				<DialogDescription>Order Details</DialogDescription>
			</DialogHeader>
			<div className="space-y-6">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="text-muted-foreground">Status</TableCell>
							<TableCell className="flex justify-end">
								<div className="flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-slate-400" />
									<span className="font-medium text-muted-foreground">
										Pending
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Client</TableCell>
							<TableCell className="flex justify-end">
								Gustavo Fonseca
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Cellphone</TableCell>
							<TableCell className="flex justify-end">
								+55 (11) 91234-5678
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">E-mail</TableCell>
							<TableCell className="flex justify-end">
								gus.fonnseca@gmail.com
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Done</TableCell>
							<TableCell className="flex justify-end">3 minutos ago</TableCell>
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
						<TableRow>
							<TableCell>Family Pepperoni Pizza</TableCell>
							<TableCell className="text-right">2</TableCell>
							<TableCell className="text-right">R$ 69,90</TableCell>
							<TableCell className="text-right">R$ 139,80</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Order Total</TableCell>
							<TableCell className="text-right font-medium">
								R$ 259,60
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</DialogContent>
	);
}
