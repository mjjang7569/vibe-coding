"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 데이터가 stale 상태로 간주되는 시간 (5분)
            staleTime: 1000 * 60 * 5,
            // 캐시에서 데이터를 유지하는 시간 (10분)
            gcTime: 1000 * 60 * 10,
            // 자동으로 데이터를 다시 가져오는 간격 (비활성화)
            refetchInterval: false,
            // 윈도우 포커스 시 자동 refetch (활성화)
            refetchOnWindowFocus: true,
            // 네트워크 재연결 시 자동 refetch (활성화)
            refetchOnReconnect: true,
            // 마운트 시 자동 refetch (활성화)
            refetchOnMount: true,
            // 에러 발생 시 재시도 횟수
            retry: 3,
            // 재시도 간격 (지수 백오프)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // 뮤테이션 에러 발생 시 재시도 횟수
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
