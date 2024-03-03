import { fetcher } from "@/utils/fetcher";

export type GetOrderDetailsParams = {
    orderId: string;
}

export type GetOrderDetailsResponse = {
    id: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    totalInCents: number
    customer: {
        name: string
        email: string
        phone: string | null
    }
    orderItems: {
        id: string
        priceInCents: number
        quantity: number
        product: {
            name: string
        }
    }[]
}

export function getOrderDetails({ orderId }: GetOrderDetailsParams) {
    return fetcher<GetOrderDetailsResponse>(`/orders/${orderId}`)
}