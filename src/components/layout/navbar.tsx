"use client";

import { useState } from "react";
import { NavLink } from "../shared/navlink";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "—";

  const navItems = [
    { href: "/dashboard", label: "Dashboard", variant: "ghost" as const },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/my-vouchers", label: "My Vouchers" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <header className="grid grid-cols-[150px_1fr_150px] bg-card p-5 relative">
      <div className="flex items-center gap-2 font-semibold text-md">
        <span className="w-10 aspect-square bg-primary rounded-lg text-white text-lg font-bold flex items-center justify-center">
          S
        </span>
        STLR
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} variant={item.variant}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden absolute right-5 top-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? "bg-black/50 opacity-100" : "bg-transparent pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-card shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b">
            <div className="flex items-center gap-2 font-semibold text-md">
              <span className="w-10 aspect-square bg-primary rounded-lg text-white text-lg font-bold flex items-center justify-center">
                S
              </span>
              STLR
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="p-5">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    variant="ghost"
                    className="w-full justify-start text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-sm font-medium text-muted-foreground">
              {userName}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <p>{userName}</p>
      </div>
    </header>
  );
}
