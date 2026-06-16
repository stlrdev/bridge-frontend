"use client";

import { Button } from "@/components/shared/button";
import { Icons } from "@/components/shared/icons";
import { Breadcrumb } from "@/components/shared/breadcrumbs";
import { usePathname } from "next/navigation";

export default function AdminDashboardSubRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
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
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <header className="mb-6 flex justify-between items-center">
        <div className="flex-1">
          <Breadcrumb items={getBreadcrumbItems()} />
        </div>
        <div>
          <Button variant="ghost">
            <Icons.Bell />
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
}
