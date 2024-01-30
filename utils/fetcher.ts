import { env } from "@/env"

// eslint-disable-next-line no-undef
type Config = RequestInit & {
    responseAs?: 'json' | 'text';
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
};

export function fetcher(endpoint: string, { body, ...customConfig }: Config = {}) {
    const headers = { 'content-type': 'application/json' }

    let config: Config = {
        method: body ? 'POST' : 'GET',
        credentials: "include",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config = {
            ...config,
            body: JSON.stringify(body)
        }
    }


    return window
        .fetch(`${env.NEXT_PUBLIC_DOMAIN}${endpoint}`, config)
        .then(async response => {
            if (response.ok) {
                return await response.json()
            } else {
                const errorMessage = await response.text()
                return Promise.reject(new Error(errorMessage))
            }
        })
}