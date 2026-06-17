"use client";

import Container from "@/components/layout/container";
import { Input } from "@/components/shared/input";
import { useOrgMerchants } from "@/features/merchants/hooks";
import MerchantCard from "@/features/merchants/components/merchant-card";

export default function MerchantsPage() {
  const { data, isLoading } = useOrgMerchants();
  const merchants = data?.data ?? [];

  return (
    <Container className="my-20">
      <h1 className="text-4xl font-extrabold">Partner Merchants</h1>
      <p className="text-muted-foreground mt-5">
        Browse all partner brands available through your organization.
      </p>

      <div className="my-8">
        <Input placeholder="Search for a merchant" className="h-12" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : merchants.length === 0 ? (
        <p className="text-muted-foreground mt-16 text-center">
          No merchants available for your organization yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-8">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="flex justify-center">
              <MerchantCard merchant={merchant} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
