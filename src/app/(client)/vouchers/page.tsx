"use client";

import Container from "@/components/layout/container";
import { useVouchers } from "@/features/vouchers/hooks";
import VoucherCard from "@/features/vouchers/components/vouchers-card";

export default function VouchersPage() {
  const { data, isLoading } = useVouchers();
  const vouchers = data?.data ?? [];

  return (
    <Container className="my-20">
      <h1 className="text-4xl font-extrabold">My Vouchers</h1>
      <p className="text-muted-foreground mt-5">
        View and manage your active benefits and savings history.
      </p>

      <div className="mt-6 space-y-4 p-5 rounded-lg bg-card">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
          ))
        ) : vouchers.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">
            You have no vouchers yet.
          </p>
        ) : (
          vouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))
        )}
      </div>
    </Container>
  );
}
