import Container from "@/components/layout/container";
import { Button } from "@/components/shared/button";
import { Icons } from "@/components/shared/icons";
import { Info } from "@/components/shared/info";
import { recommendedVouchers, vouchers } from "@/data/my-vouchers";
import VoucherCard from "@/features/vouchers/components/vouchers-card";
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

  const voucher = vouchers.find((voucher) => voucher.id === voucherId);
  return (
    <Container className="my-20">
      <button className="text-muted-foreground flex items-center gap-2">
        <Icons.ArrowLeft />
        Back to all vouchers
      </button>
      <div className="grid grid-cols-[1fr_500px] gap-8 mt-6">
        <div>
          <div className="space-y-4 p-5 rounded-lg bg-card">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h4 className="text-2xl font-bold">{voucher?.title}</h4>
              </div>
              <div>
                <p className="text-sm text-primary font-semibold">Value</p>
                <p className="mt-2 font-semibold">
                  {formatCurrency(voucher?.value || 0)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center py-10 relative">
              <Image
                src="/images/qr.png"
                alt="QR Code"
                className={cn(
                  "w-[400px]",
                  voucher?.status === "used" && "grayscale opacity-25",
                )}
                width={200}
                height={200}
              />
              {voucher?.status === "used" && (
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
                {voucher?.code}
              </code>
            </div>
          </div>
          <Info title="Looking for more savings?" className="mt-5">
            <p>
              Don’t miss out on your other active benefits.New offers are added
              every Tuesday based on your preferences.
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
            {recommendedVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="flex justify-between items-start p-4 border rounded-lg"
              >
                <div>
                  <h4 className="text-lg font-semibold">{voucher.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {voucher.description}
                  </p>
                </div>
                <p className="text-sm text-primary font-semibold">
                  {formatCurrency(voucher.discount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
