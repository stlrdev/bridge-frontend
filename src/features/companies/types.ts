export type CompanyTier = "STARTER" | "GROWTH" | "ENTERPRISE";

export interface CompanyBranding {
  companyId: string;
  companyName: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
}

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  employeeCount: number;
  activeSubscription: boolean;
  tier: CompanyTier;
  branding?: CompanyBranding;
  createdAt: string;
}

export interface CompanyListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
