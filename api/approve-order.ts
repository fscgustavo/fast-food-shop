import { fetcher } from "@/utils/fetcher";

export type ApproveOrderParams = {
    orderId: string;
}


export function approveOrder({ orderId }: ApproveOrderParams) {
    return fetcher(`/orders/${orderId}/approve`, { method: 'PATCH', body: {} }).then(() => null)
}