"use client";

import Container from "@/components/layout/container";
import { Button } from "@/components/shared/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/lib/toast";
import { formatCurrency } from "@/lib/utils";
import { useMerchant } from "@/features/merchants/hooks";
import { useOrgOffers } from "@/features/offers/hooks";
import { useClaimVoucher } from "@/features/vouchers/hooks";
import React from "react";

export default function OfferDetailsPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = React.use(params);

  const { data: merchant, isLoading: merchantLoading } = useMerchant(offerId);
  const { data: offersData, isLoading: offersLoading } = useOrgOffers();
  const claimVoucher = useClaimVoucher();

  const merchantOffers = (offersData?.data ?? []).filter(
    (o) => o.merchantId === offerId,
  );

  return (
    <Container>
      <Card className="max-w-2xl mx-auto my-20 overflow-hidden">
        <CardHeader className="bg-muted p-5">
          <CardTitle>
            {merchantLoading ? "Loading..." : (merchant?.name ?? "Merchant Offers")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          {offersLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : merchantOffers.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              No offers available from this merchant right now.
            </p>
          ) : (
            <div className="space-y-4">
              {merchantOffers.map((offer) => {
                const valueLabel =
                  offer.discountType === "PERCENTAGE"
                    ? `${offer.discountValue}% OFF`
                    : formatCurrency(offer.discountValue);
                return (
                  <div
                    key={offer.id}
                    className="border rounded-lg p-4 flex justify-between items-start gap-4"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{offer.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {offer.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Expires{" "}
                        {new Date(offer.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-primary font-bold">{valueLabel}</span>
                      <Button
                        size="sm"
                        disabled={claimVoucher.isPending || !offer.isActive}
                        onClick={() =>
                          claimVoucher.mutate(offer.id, {
                            onSuccess: () =>
                              toast.success("Voucher claimed! Check your wallet."),
                            onError: () =>
                              toast.error("Failed to claim voucher"),
                          })
                        }
                      >
                        {offer.isActive ? "Claim" : "Unavailable"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
