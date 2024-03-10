
import { fetcher } from '@/utils/fetcher'

export interface GetMonthRevenueResponse {
    receipt: number
    diffFromLastMonth: number
}

export async function getMonthRevenue() {
    const response = await fetcher<GetMonthRevenueResponse>(
        '/metrics/month-receipt',
    )

    return response.data
}
