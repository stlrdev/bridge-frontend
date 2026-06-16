"use client";

import { useOrgOffers } from "@/features/offers/hooks";
import { useClaimVoucher } from "@/features/vouchers/hooks";
import { Button } from "@/components/shared/button";
import { toast } from "@/lib/toast";
import { formatCurrency } from "@/lib/utils";

export default function OffersPage() {
  const { data, isLoading } = useOrgOffers();
  const claimVoucher = useClaimVoucher();

  const offers = data?.data ?? [];

  const handleClaim = (offerId: string) => {
    claimVoucher.mutate(offerId, {
      onSuccess: () => toast.success("Voucher claimed! Check your wallet."),
      onError: () => toast.error("Failed to claim voucher"),
    });
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">Available Offers</h1>
      <p className="text-muted-foreground mb-8">
        Browse and claim benefits available to your organization.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : offers.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">
          No offers available for your organization right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const valueLabel =
              offer.discountType === "PERCENTAGE"
                ? `${offer.discountValue}% OFF`
                : formatCurrency(offer.discountValue);

            return (
              <div
                key={offer.id}
                className="rounded-xl border p-5 flex flex-col gap-3 bg-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">
                      {offer.merchantName}
                    </p>
                    <h3 className="font-semibold mt-1">{offer.title}</h3>
                  </div>
                  <span className="text-lg font-bold text-primary">{valueLabel}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {offer.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires {new Date(offer.validUntil).toLocaleDateString()}
                </p>
                <Button
                  size="sm"
                  className="mt-auto"
                  onClick={() => handleClaim(offer.id)}
                  disabled={claimVoucher.isPending || !offer.isActive}
                >
                  {offer.isActive ? "Get Voucher" : "Unavailable"}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
