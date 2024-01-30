import { fetcher } from "@/utils/fetcher";

export type GetManagedRestaurant = {
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    description: string | null;
    managerId: string | null;
}
export const getManagedRestaurant = () => fetcher("/managed-restaurant")