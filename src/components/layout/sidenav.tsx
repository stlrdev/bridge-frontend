"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { Icons } from "../shared/icons";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  children?: NavItem[];
  isActive?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <Icons.Dashboard />,
  },
  {
    title: "Companies",
    href: "/admin/companies",
    icon: <Icons.Companies />,
  },
  {
    title: "Merchants",
    href: "/admin/merchants",
    icon: <Icons.Shop />,
  },
  {
    title: "Offers",
    href: "/admin/offers",
    icon: <Icons.TagPrice />,
  },
  {
    title: "Vouchers",
    href: "/admin/vouchers",
    icon: <Icons.Coupon />,
  },
  {
    title: "Reporting",
    href: "/admin/reporting",
    icon: <Icons.ChartBar />,
  },
];

interface SideNavProps {
  className?: string;
}

export function SideNav({ className }: SideNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-background shadow-md"
        >
          {mobileMenuOpen ? (
            <X className="size-4" />
          ) : (
            <Menu className="size-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          "lg:sticky lg:top-0 lg:left-auto lg:translate-x-0 lg:z-auto",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  ST
                </span>
              </div>
              <span className="font-semibold text-lg">STLR Admin</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="hidden lg:flex"
          >
            <Menu className="size-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.title}>
              {item.href ? (
                <Link href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    {item.icon}
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        {isActive(item.href) && (
                          <div className="size-2 rounded-full bg-primary" />
                        )}
                      </>
                    )}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      <ChevronDown className="size-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-destructive hover:text-destructive",
              isCollapsed && "justify-center px-2",
            )}
          >
            <LogOut className="size-4" />
            {!isCollapsed && <span className="flex-1 text-left">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}

export default SideNav;
