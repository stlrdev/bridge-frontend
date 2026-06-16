import { UserRole } from "../types";

/**
 * Maps each user role to their designated home route.
 * Used to redirect users to their appropriate dashboard after login.
 */
export const ROLE_HOME_ROUTES: Record<UserRole, string> = {
  EMPLOYEE: "/dashboard",
  COMPANY_ADMIN: "/admin/dashboard",
  MERCHANT_USER: "/merchant/validate",
  STLR_ADMIN: "/stlr/dashboard",
};

/**
 * Defines protected route prefixes and the roles allowed to access them.
 * Used by middleware and route guards to enforce access control.
 * Routes not listed here are considered public.
 */
export const PROTECTED_ROUTE_PREFIXES: Record<string, UserRole[]> = {
  "/dashboard": ["EMPLOYEE"],
  "/merchants": ["EMPLOYEE"],
  "/vouchers": ["EMPLOYEE"],
  "/admin": ["COMPANY_ADMIN"],
  "/merchant": ["MERCHANT_USER"],
  "/stlr": ["STLR_ADMIN"],
};

/**
 * Union type representing all available permissions in the system.
 * Permissions follow the pattern "resource:action" for granular access control.
 */
export type Permission =
  // Vouchers
  | "vouchers:generate"
  | "vouchers:view_own"
  | "vouchers:view_all"
  | "vouchers:validate"
  // Merchants
  | "merchants:view"
  | "merchants:manage"
  // Offers
  | "offers:view"
  | "offers:manage"
  // Employees
  | "employees:view"
  // Analytics
  | "analytics:view_company"
  | "analytics:view_all"
  // Companies
  | "companies:manage"
  // Tiers
  | "tiers:manage"
  // Admin Access
  | "admin:access";

/**
 * Maps each user role to their assigned permissions.
 * Defines what actions each role can perform within the application.
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  EMPLOYEE: [
    "vouchers:generate",
    "vouchers:view_own",
    "merchants:view",
    "offers:view",
  ],
  COMPANY_ADMIN: [
    "vouchers:view_all",
    "merchants:view",
    "offers:view",
    "employees:view",
    "analytics:view_company",
  ],
  MERCHANT_USER: ["vouchers:validate", "vouchers:view_all"],
  STLR_ADMIN: [
    "vouchers:view_all",
    "merchants:view",
    "merchants:manage",
    "offers:view",
    "offers:manage",
    "employees:view",
    "analytics:view_all",
    "companies:manage",
    "tiers:manage",
    "admin:access",
  ],
};

/**
 * Checks if a user role has a specific permission.
 * @param role - The user role to check
 * @param permission - The permission to verify
 * @returns true if the role has the permission, false otherwise
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Checks if a user role has any of the specified permissions.
 * Useful for conditional rendering based on multiple possible permissions.
 * @param role - The user role to check
 * @param permissions - Array of permissions to check against
 * @returns true if the role has at least one of the permissions, false otherwise
 */
export function hasAnyPermission(
  role: UserRole,
  permissions: Permission[],
): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

/**
 * Determines if a user role can access a specific route based on path.
 * Checks protected route prefixes and validates role access.
 * @param role - The user role attempting to access the route
 * @param pathname - The route path to check
 * @returns true if the role can access the route, false otherwise
 */
export function canAccessRoute(role: UserRole, pathname: string): boolean {
  const matchedPrefix = Object.keys(PROTECTED_ROUTE_PREFIXES).find((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!matchedPrefix) return true;
  return PROTECTED_ROUTE_PREFIXES[matchedPrefix].includes(role);
}

/**
 * Gets the home route for a given user role.
 * Used for post-login redirects and navigation.
 * @param role - The user role
 * @returns The home route path for the role, or "/" if role not found
 */
export function getHomeRoute(role: UserRole): string {
  return ROLE_HOME_ROUTES[role] ?? "/";
}
