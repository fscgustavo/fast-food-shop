import { fetcher } from "@/utils/fetcher";

export type DeliverOrderParams = {
    orderId: string;
}


export function deliverOrder({ orderId }: DeliverOrderParams) {
    return fetcher(`/orders/${orderId}/deliver`, { method: 'PATCH', body: {} }).then(() => null)
}