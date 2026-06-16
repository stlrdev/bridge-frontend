export type MerchantCategory =
  | "FOOD_BEVERAGE"
  | "RETAIL"
  | "HEALTH_WELLNESS"
  | "ENTERTAINMENT"
  | "TRAVEL"
  | "SERVICES"
  | "TECHNOLOGY"
  | "OTHER";

export interface Merchant {
  id: string;
  name: string;
  description: string;
  category: MerchantCategory;
  logoUrl?: string;
  coverImageUrl?: string;
  location?: string;
  website?: string;
  isActive: boolean;
  offersCount: number;
  createdAt: string;
}

export interface MerchantRetail extends Merchant {
  offers: import("@/features/offers/types").Offer[];
}
