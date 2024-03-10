
import { fetcher } from '@/utils/fetcher'

export type GetDailyRevenueInPeriodQuery = {
    from?: Date
    to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
    date: string
    receipt: number
}[]

export async function getDailyRevenueInPeriod() {
    const response = await fetcher<GetDailyRevenueInPeriodResponse>(
        `/metrics/daily-receipt-in-period`,
    )

    return response.data
}
