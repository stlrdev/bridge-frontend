"use client";

import SideNav from "@/components/layout/sidenav";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <main className="h-screen flex overflow-hidden">
      <SideNav className="h-full shrink-0" />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </main>
  );
}
