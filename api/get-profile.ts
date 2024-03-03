import { fetcher } from "@/utils/fetcher";

export type GetUserProfile = {
    email: string;
    id: string;
    name: string;
    phone: string | null;
    role: "manager" | "customer";
    createdAt: Date | null;
    updatedAt: Date | null;
}

export const getUserProfile = () => fetcher<GetUserProfile>("/me")