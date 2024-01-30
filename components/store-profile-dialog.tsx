import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import useSWRImmutable from "swr/immutable";

import {
	GetManagedRestaurant,
	getManagedRestaurant,
} from "@/api/get-managed-restaurant";
import { updateProfile } from "@/app/(main)/dashboard/actions";

import { Button } from "./ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function StoreProfileDIalog() {
	const { pending: isUpdatingProfile } = useFormStatus();

	const { data: managedRestaurant } = useSWRImmutable<GetManagedRestaurant>(
		"/managed-restaurant",
		getManagedRestaurant
	);

	async function updateProfileAction(formData: FormData) {
		try {
			await updateProfile(formData);

			toast.success("The profile was successfully updated");
		} catch (error) {
			toast.error(
				"An error occurred while updating the profile. Please, try again later."
			);
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Store&apos;s profile</DialogTitle>
				<DialogDescription>
					Update the information of your establishment visible to your
					customers.
				</DialogDescription>
			</DialogHeader>
			<form action={updateProfileAction} noValidate>
				<div className="space-y-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="name">
							Name
						</Label>
						<Input
							className="col-span-3"
							id="name"
							name="name"
							defaultValue={managedRestaurant?.name ?? ""}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="description">
							Description
						</Label>
						<Textarea
							className="col-span-3"
							id="description"
							name="description"
							defaultValue={managedRestaurant?.description ?? ""}
							rows={6}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost" type="button">
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" variant="success" disabled={isUpdatingProfile}>
						Save
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}
