"use client";

import { useEffect, useState, type ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { createQueryClient } from "@/core/query/client";
import { Toaster } from "@/components/ui/sonner";
import { setTokenAccessor } from "@/core/api/client";

function TokenBridge() {
  const { data: session } = useSession();

  // Set synchronously on render so the accessor is ready before queries fire
  setTokenAccessor(() => session?.accessToken ?? null);

  useEffect(() => {
    setTokenAccessor(() => session?.accessToken ?? null);
  }, [session?.accessToken]);

  return null;
}

export function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TokenBridge />
          {children}
        </ThemeProvider>
        <Toaster />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}
