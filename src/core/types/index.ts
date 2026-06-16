export type UserRole =
  | "EMPLOYEE"
  | "COMPANY_ADMIN"
  | "MERCHANT_USER"
  | "STLR_ADMIN";

export interface BridgeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  role: UserRole;
  companyId?: string;
  merchantId?: string;
  clientOrganizationId?: string;
  avatarUrl?: string;
}

export interface BridgeSession {
  user: BridgeUser;
  accessToken: string;
  expiresAt: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}
