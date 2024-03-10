import { fetcher } from "@/utils/fetcher"


export type GetDayOrdersAmountResponse = {
    amount: number
    diffFromYesterday: number
}

export async function getDayOrdersAmount() {
    const response = await fetcher<GetDayOrdersAmountResponse>(
        '/metrics/day-orders-amount',
    )

    return response.data
}