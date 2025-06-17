import { useState, useCallback } from "react";

type ApiResponse<T> = {
    message: string;
    traceId: string;
    data: T;
    errorCodes?: { code: string; message: string }[];
};

type MutationOptions<T, P> = {
    onSuccess?: (data: T) => void;
    onError?: (err: Error) => void;
    onSettled?: () => void;
};

export function useMutationApi<T = unknown, P = unknown>(
    mutationFn: (payload: P) => Promise<ApiResponse<T>>,
    options?: MutationOptions<T, P>
) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = useCallback(
        async (payload: P) => {
            setIsLoading(true);
            setIsSuccess(false);
            setError(null);

            try {
                const res = await mutationFn(payload);

                if (res.errorCodes?.length) {
                    const errMsg = res.errorCodes.map(e => e.message).join(", ");
                    throw new Error(errMsg);
                }

                setData(res.data);
                setIsSuccess(true);
                options?.onSuccess?.(res.data);
            } catch (err: any) {
                setError(err);
                options?.onError?.(err);
            } finally {
                setIsLoading(false);
                options?.onSettled?.();
            }
        },
        [mutationFn, options]
    );

    return { mutate, data, isLoading, isSuccess, error };
}
