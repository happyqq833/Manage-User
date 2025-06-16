import { useEffect, useState, useCallback } from "react";

type ErrorCode = { code: string; message: string };

type ApiResponse<T> = {
  message: string;
  traceId: string;
  data: T;
  errorCodes?: ErrorCode[];
};

export function useSimpleApi<T>(
  fetchFn: () => Promise<ApiResponse<T>>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [errorCodes, setErrorCodes] = useState<ErrorCode[] | null>(null);

  const loadData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setErrorCodes(null);

    fetchFn()
      .then((res) => {
        if (res.errorCodes?.length) {
          setErrorCodes(res.errorCodes);
          setError(new Error("Business logic error"));
        } else {
          setData(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchFn]);

  useEffect(() => {
    loadData();
  }, deps);

  return { data, isLoading, error, errorCodes, refetch: loadData };
}
