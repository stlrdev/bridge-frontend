export type OfferTier = "BASIC" | "STANDARD" | "PREMIUM" | "EXCLUSIVE";

export interface Offer {
  id: string;
  merchantId: string;
  merchantName?: string;
  title: string;
  description: string;
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED";
  tier: OfferTier;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  maxRedemptions?: number;
  currentRedemptions?: number;
}

export interface CreateOfferPayload {
  merchantId: string;
  title: string;
  description: string;
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED";
  tier: OfferTier;
  validFrom: string;
  validUntil: string;
  maxRedemptions?: number;
}
