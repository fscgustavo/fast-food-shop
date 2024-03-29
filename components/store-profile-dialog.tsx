import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { getManagedRestaurant } from "@/api/get-managed-restaurant";
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
	const { mutate } = useSWRConfig();

	const { pending: isUpdatingProfile } = useFormStatus();

	const { data: managedRestaurant } = useSWRImmutable(
		"/managed-restaurant",
		getManagedRestaurant
	);

	async function updateProfileAction(formData: FormData) {
		try {
			await mutate("/managed-restaurant", updateProfile(formData), {
				optimisticData: {
					...managedRestaurant,
					name: formData.get("name"),
					description: formData.get("description"),
				},
				rollbackOnError: true,
				revalidate: false,
				populateCache: false,
			});

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
							defaultValue={managedRestaurant?.data?.name ?? ""}
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
							defaultValue={managedRestaurant?.data?.description ?? ""}
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
