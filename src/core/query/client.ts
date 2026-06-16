import { QueryClient } from "@tanstack/react-query";

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 60_000 * 5,
        retry: (failureCount, _err) => {
          const status = (_err as { statusCode?: number })?.statusCode;
          if (status && status >= 400 && status < 500) return false;
          return failureCount < 3;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        throwOnError: false,
      },
    },
  });
}
