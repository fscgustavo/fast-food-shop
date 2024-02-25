import { fetcher } from "@/utils/fetcher";

export type GetOrdersQuery = {
    pageIndex?: number | null
}

export type Order = {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
}

export type GetOrdersResponse = {
    orders: Order[];
    meta: {
        pageIndex: number;
        perPage: number;
        totalCount: number;
    };
}

export function getOrders({ pageIndex }: GetOrdersQuery) {
    return fetcher(`/orders?pageIndex=${pageIndex}`)
}