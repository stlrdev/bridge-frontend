import { PaginationParams } from "@/core/types";

export type ClientOrganizationStatus = "active" | "suspended" | "inactive";

export interface ClientOrganization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  status: ClientOrganizationStatus;
  enabledMerchants: string[];
  enabledCampaigns: string[];
  enabledVouchers: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ClientEmployee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface CreateClientOrganizationPayload {
  name: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface CompanyListParams extends PaginationParams {
  status?: ClientOrganizationStatus;
  search?: string;
}

// UI alias kept for compatibility with existing page components
export type Company = ClientOrganization;
