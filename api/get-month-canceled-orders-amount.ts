import { fetcher } from "@/utils/fetcher"

export interface GetMonthCanceledOrdersAmountResponse {
    amount: number
    diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
    const response = await fetcher<GetMonthCanceledOrdersAmountResponse>(
        '/metrics/month-canceled-orders-amount',
    )

    return response.data
}
