import { Button } from "@/components/shared/button";
import type { Merchant } from "@/data/merchants";
import Image from "next/image";

export default function MerchantCard({ merchant }: { merchant: Merchant }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      <div className="relative">
        {/* Dark green background for image container */}
        <div className="bg-primary/20 h-48 flex items-center justify-center">
          <Image
            src={merchant.image}
            alt={merchant.name}
            className="h-full w-full object-cover"
            width={512}
            height={512}
          />
        </div>

        {/* F&B tag */}
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {merchant.tag}
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{merchant.name}</h3>
          <span className="text-primary font-bold text-lg">
            {merchant.discountLabel}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed grow">
          {merchant.description}
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
