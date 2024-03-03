import { fetcher } from "@/utils/fetcher";

export type CancelOrderParams = {
    orderId: string;
}


export function cancelOrder({ orderId }: CancelOrderParams) {
    return fetcher(`/orders/${orderId}/cancel`, { method: 'PATCH', body: {} }).then(() => null)
}