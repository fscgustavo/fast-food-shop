
import { fetcher } from '@/utils/fetcher'

export type GetPopularProductsResponse = {
    product: string
    amount: number
}[]

export async function getPopularProducts() {
    const response = await fetcher<GetPopularProductsResponse>(
        '/metrics/popular-products',
    )

    return response.data
}
