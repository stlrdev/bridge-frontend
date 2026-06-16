import { Button } from "@/components/shared/button";
import type { Merchant } from "@/features/merchants/types";
import Image from "next/image";

export default function MerchantCard({ merchant }: { merchant: Merchant }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      <div className="relative">
        <div className="bg-primary/20 h-48 flex items-center justify-center">
          {merchant.logo ? (
            <Image
              src={merchant.logo}
              alt={merchant.name}
              className="h-full w-full object-cover"
              width={512}
              height={512}
            />
          ) : (
            <span className="text-5xl font-bold text-primary/40">
              {merchant.name[0].toUpperCase()}
            </span>
          )}
        </div>

        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
          {merchant.category}
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{merchant.name}</h3>
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed grow">
          {merchant.description ?? ""}
        </p>

        <div className="mt-auto">
          <Button className="w-full" href={`/offers/${merchant.id}`}>
            View Offer
          </Button>
        </div>
      </div>
    </div>
  );
}
