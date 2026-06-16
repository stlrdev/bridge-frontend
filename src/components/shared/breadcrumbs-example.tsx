"use client";

import * as React from "react";
import { Home, FileText, Settings, Users, Package } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbItem as BreadcrumbItemType,
} from "@/components/shared/breadcrumbs";

export function BreadcrumbsExample() {
  const [currentPath, setCurrentPath] = React.useState("/admin/users/settings");

  const exampleItems: BreadcrumbItemType[] = [
    { label: "Admin", href: "/admin", icon: <Settings className="h-4 w-4" /> },
    {
      label: "Users",
      href: "/admin/users",
      icon: <Users className="h-4 w-4" />,
    },
    { label: "Settings", isActive: true },
  ];

  const longBreadcrumbItems: BreadcrumbItemType[] = [
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "Admin", href: "/admin", icon: <Settings className="h-4 w-4" /> },
    { label: "Users", href: "/admin/users" },
    { label: "Management", href: "/admin/users/management" },
    { label: "Permissions", href: "/admin/users/management/permissions" },
    {
      label: "Role Settings",
      href: "/admin/users/management/permissions/roles",
    },
    {
      label: "Advanced",
      href: "/admin/users/management/permissions/roles/advanced",
    },
    { label: "Configuration", isActive: true },
  ];

  const customItems: BreadcrumbItemType[] = [
    { label: "Dashboard", href: "/dashboard" },
    {
      label: "Products",
      href: "/dashboard/products",
      icon: <Package className="h-4 w-4" />,
    },
    { label: "Electronics", href: "/dashboard/products/electronics" },
    { label: "Laptops", href: "/dashboard/products/electronics/laptops" },
    { label: "Gaming", isActive: true },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Basic Breadcrumb</h2>
        <Breadcrumb items={exampleItems} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Breadcrumb with Home Icon
        </h2>
        <Breadcrumb
          items={exampleItems}
          showHomeIcon
          homeIcon={<Home className="h-4 w-4" />}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Long Breadcrumb with Max Items
        </h2>
        <Breadcrumb items={longBreadcrumbItems} maxItems={5} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Custom Separator</h2>
        <Breadcrumb
          items={customItems}
          separator={<span className="text-muted-foreground">/</span>}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Size Variants</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small</p>
            <Breadcrumb items={exampleItems} size="sm" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Default</p>
            <Breadcrumb items={exampleItems} size="default" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Large</p>
            <Breadcrumb items={exampleItems} size="lg" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Variant Styles</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Default</p>
            <Breadcrumb items={exampleItems} variant="default" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Subtle</p>
            <Breadcrumb items={exampleItems} variant="subtle" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Strong</p>
            <Breadcrumb items={exampleItems} variant="strong" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Manual Composition</h2>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/users">Users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </ol>
        </nav>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          With Custom Click Handlers
        </h2>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label: "Custom Action",
              onClick: () => alert("Custom action triggered!"),
            },
            { label: "Current Page", isActive: true },
          ]}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Disabled Items</h2>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Enabled", href: "/enabled" },
            { label: "Disabled", isDisabled: true },
            { label: "Current", isActive: true },
          ]}
        />
      </div>
    </div>
  );
}

export default BreadcrumbsExample;
