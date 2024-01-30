import { Building, ChevronDown, LogOut } from "lucide-react";
import useSWRImmutable from "swr/immutable";

import {
	GetManagedRestaurant,
	getManagedRestaurant,
} from "@/api/get-managed-restaurant";
import { GetUserProfile, getUserProfile } from "@/api/get-profile";

import { StoreProfileDIalog } from "./store-profile-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
	const { data: profile, isLoading: isLoadingProfile } =
		useSWRImmutable<GetUserProfile>("/me", getUserProfile);

	const { data: managedRestaurant, isLoading: isLoadingRestaurant } =
		useSWRImmutable<GetManagedRestaurant>(
			"/managed-restaurant",
			getManagedRestaurant
		);

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex items-center gap-2 select-none"
					>
						{isLoadingRestaurant ? (
							<Skeleton className="h-4 w-40" />
						) : (
							managedRestaurant?.name
						)}
						<ChevronDown className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isLoadingProfile ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span>{profile?.name}</span>
								<span className="text-xs font-normal text-muted-foreground">
									{profile?.email}
								</span>
							</>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="h-4 w-4 mr-2" />
							<span>Store&apos;s profile</span>
						</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem className="text-rose-500 dark:text-rose-400">
						<LogOut className="h-4 w-4 mr-2" />
						<span>Log Out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<StoreProfileDIalog />
		</Dialog>
	);
}
