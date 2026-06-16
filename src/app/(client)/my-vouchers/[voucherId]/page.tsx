"use client";

import Container from "@/components/layout/container";
import { Button } from "@/components/shared/button";
import { Icons } from "@/components/shared/icons";
import { Info } from "@/components/shared/info";
import { useVoucherById, useDiscoverVouchers } from "@/features/vouchers/hooks";
import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VoucherDetailPage({
  params,
}: {
  params: Promise<{ voucherId: string }>;
}) {
  const { voucherId } = React.use(params);

  const { data: voucher, isLoading } = useVoucherById(voucherId);
  const { data: discoverData } = useDiscoverVouchers();
  const recommended = discoverData?.data ?? [];

  const title = voucher
    ? (voucher.campaignName ?? voucher.description ?? voucher.code)
    : "";
  const numericValue = voucher ? parseFloat(voucher.value) : 0;
  const isRedeemed = voucher?.status === "redeemed";

  return (
    <Container className="my-20">
      <button className="text-muted-foreground flex items-center gap-2">
        <Icons.ArrowLeft />
        Back to all vouchers
      </button>
      <div className="grid grid-cols-[1fr_500px] gap-8 mt-6">
        <div>
          {isLoading ? (
            <div className="h-[500px] rounded-lg bg-muted animate-pulse" />
          ) : !voucher ? (
            <div className="p-10 text-center text-muted-foreground rounded-lg bg-card">
              Voucher not found.
            </div>
          ) : (
            <div className="space-y-4 p-5 rounded-lg bg-card">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h4 className="text-2xl font-bold">{title}</h4>
                </div>
                <div>
                  <p className="text-sm text-primary font-semibold">Value</p>
                  <p className="mt-2 font-semibold">
                    {voucher.type === "percentage"
                      ? `${numericValue}% OFF`
                      : formatCurrency(numericValue)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center py-10 relative">
                <Image
                  src={voucher.qrCodeUrl ?? "/images/qr.png"}
                  alt="QR Code"
                  className={cn(
                    "w-[400px]",
                    isRedeemed && "grayscale opacity-25",
                  )}
                  width={200}
                  height={200}
                />
                {isRedeemed && (
                  <Image
                    src="/used.png"
                    alt="Used"
                    width={200}
                    height={200}
                    className="absolute w-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                )}
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-muted-foreground font-semibold">
                  VOUCHER CODE
                </p>
                <code className="py-2 px-3 bg-white rounded-md">
                  {voucher.code}
                </code>
              </div>
            </div>
          )}
          <Info title="Looking for more savings?" className="mt-5">
            <p>
              Don&apos;t miss out on your other active benefits. New offers are
              added regularly based on your preferences.
            </p>
            <Link
              href="/vouchers"
              className="mt-3 inline-flex items-center gap-1 text-primary text-sm font-medium underline hover:gap-2 transition-all"
            >
              View All <Icons.ArrowRight />
            </Link>
          </Info>
        </div>
        <div>
          <div className="flex items-center justify-between gap-5">
            <h4 className="text-lg font-semibold">Recommended for you</h4>
            <Link href="/vouchers" className="text-primary text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid gap-3 mt-4">
            {recommended.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                No recommendations yet.
              </p>
            ) : (
              recommended.slice(0, 5).map((rec) => {
                const recTitle =
                  rec.campaignName ?? rec.description ?? rec.code;
                const recValue = parseFloat(rec.value);
                return (
                  <div
                    key={rec.id}
                    className="flex justify-between items-start p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="text-lg font-semibold">{recTitle}</h4>
                      <p className="text-sm text-muted-foreground">
                        {rec.description ?? rec.merchantName ?? ""}
                      </p>
                    </div>
                    <p className="text-sm text-primary font-semibold">
                      {rec.type === "percentage"
                        ? `${recValue}% OFF`
                        : formatCurrency(recValue)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
