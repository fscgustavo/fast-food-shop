import { fetcher } from "@/utils/fetcher";

export type DispatchOrderParams = {
    orderId: string;
}


export function dispatchOrder({ orderId }: DispatchOrderParams) {
    return fetcher(`/orders/${orderId}/dispatch`, { method: 'PATCH', body: {} }).then(() => null)
}