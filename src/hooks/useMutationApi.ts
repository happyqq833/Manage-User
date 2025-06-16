
import { useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

type MutationOptions<T> = {
    method?: 'post' | 'put' | 'delete'
    onSuccess?: (data: T, variables?: any) => void
    onError?: (error: any) => void
}

export function useMutation<T = any>(url: string, options?: MutationOptions<T>) {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [data, setData] = useState<T | null>(null)

    const mutate = async (body?: any) => {
        setLoading(true)
        setError(null)

        try {
            const config: AxiosRequestConfig = {
                url,
                method: options?.method || 'post',
                data: body
            }

            const res = await axios(config)
            setData(res.data)
            options?.onSuccess?.(res.data, body)
        } catch (err: any) {
            setError(err)
            options?.onError?.(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        mutate,
        isLoading,
        error,
        data
    }
}
