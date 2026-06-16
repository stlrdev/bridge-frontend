import { PaginationParams } from "@/core/types";

export type MerchantCategory =
  | "restaurant"
  | "food"
  | "retail"
  | "entertainment"
  | "travel"
  | "health"
  | "services"
  | "electronics"
  | "fashion"
  | "grocery"
  | "other";

export type MerchantStatus = "pending" | "active" | "suspended" | "inactive";

export interface Merchant {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  coverImage: string | null;
  primaryColor: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  website: string | null;
  category: MerchantCategory;
  businessRegistrationNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  status: MerchantStatus;
  subdomain: string | null;
  branchCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  merchantId: string;
  merchantName: string;
  name: string;
  code: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  operatingHours: Record<string, string> | null;
  isPrimary: boolean;
  canRedeemVouchers: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMerchantPayload {
  name: string;
  description?: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  category: MerchantCategory;
  businessRegistrationNumber?: string;
  taxId?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  subdomain?: string;
  primaryColor?: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerPhoneNumber?: string;
}

export interface CreateBranchPayload {
  name: string;
  code?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  operatingHours?: Record<string, string>;
  isPrimary?: boolean;
  canRedeemVouchers?: boolean;
}

export interface MerchantsListParams extends PaginationParams {
  status?: MerchantStatus;
  category?: MerchantCategory;
  search?: string;
}
