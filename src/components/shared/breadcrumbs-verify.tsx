"use client";

import { Breadcrumb } from "./breadcrumbs";

// Test the breadcrumb generation logic
export function BreadcrumbsVerify() {
  const testPaths = [
    "/admin",
    "/admin/companies",
    "/admin/companies/add",
    "/admin/offers",
    "/admin/offers/123",
    "/admin/merchants",
    "/admin/vouchers",
    "/admin/reporting",
  ];

  const generateBreadcrumbs = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbItems: Array<{
      label: string;
      href?: string;
      isActive?: boolean;
    }> = [{ label: "Admin", href: "/admin" }];

    // Find the index of 'admin' to start from there
    const adminIndex = segments.indexOf("admin");
    const relevantSegments =
      adminIndex !== -1 ? segments.slice(adminIndex + 1) : segments;

    relevantSegments.forEach((segment, index) => {
      let label = segment;

      // Handle dynamic routes like [offerId]
      if (segment.startsWith("[") && segment.endsWith("]")) {
        label = "Details";
      }

      // Format labels
      label = label.charAt(0).toUpperCase() + label.slice(1);

      // Check if this is the last segment (current page)
      const isLast = index === relevantSegments.length - 1;

      // Build href by joining segments up to current index
      const href = "/admin/" + relevantSegments.slice(0, index + 1).join("/");

      const breadcrumbItem = {
        label,
        href: isLast ? undefined : href,
        isActive: isLast,
      };

      breadcrumbItems.push(breadcrumbItem);
    });

    return breadcrumbItems;
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Breadcrumbs Verification</h1>

      {testPaths.map((path) => {
        const items = generateBreadcrumbs(path);
        return (
          <div key={path} className="space-y-2">
            <h3 className="text-sm font-mono text-muted-foreground">{path}</h3>
            <Breadcrumb items={items} />
          </div>
        );
      })}
    </div>
  );
}
