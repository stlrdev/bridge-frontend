import { UserRole } from "@/core/types";

export interface BackendUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string | null;
  userType: string;
  merchantId: string | null;
  merchantName: string | null;
  clientOrganizationId: string | null;
  clientOrganizationName: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface BackendTokens {
  access: string;
  refresh: string;
}

export interface BackendLoginResponse {
  user: BackendUser;
  tokens: BackendTokens;
}

const USER_TYPE_TO_ROLE: Record<string, UserRole> = {
  Admin: "STLR_ADMIN",
  "Client Organization Owner": "COMPANY_ADMIN",
  "Client Admin": "COMPANY_ADMIN",
  Customer: "EMPLOYEE",
  "Merchant Owner": "MERCHANT_USER",
  "Merchant Manager": "MERCHANT_USER",
  "Merchant Staff": "MERCHANT_USER",
};

export function mapUserTypeToRole(userType: string): UserRole {
  return USER_TYPE_TO_ROLE[userType] ?? "EMPLOYEE";
}
