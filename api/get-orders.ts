import { fetcher } from "@/utils/fetcher";



export type Order = {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
}

export type GetOrdersQuery = {
    pageIndex?: string | null
    orderId: Order['orderId'] | null
    status: string | null
    customerName: Order['customerName'] | null
}

export type GetOrdersResponse = {
    orders: Order[];
    meta: {
        pageIndex: number;
        perPage: number;
        totalCount: number;
    };
}

export function getOrders(queries: GetOrdersQuery) {
    const searchParams = new URLSearchParams()

    queries.pageIndex && searchParams.set("pageIndex", queries.pageIndex)
    queries.orderId && searchParams.set("orderId", queries.orderId)
    queries.status && searchParams.set("status", queries.status)
    queries.customerName && searchParams.set("customerName", queries.customerName)

    const searchParamsString = searchParams.toString() ? `?${searchParams.toString()}` : ''

    return fetcher<GetOrdersResponse>(`/orders${searchParamsString}`)
}