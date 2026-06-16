"use client";

import { usePathname } from "next/navigation";
import { Icons } from "@/components/shared/icons";
import SideNav from "@/components/layout/sidenav";

export default function RootNotFound() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // For admin routes, render the admin not-found content with proper layout
  if (isAdminRoute) {
    return (
      <main className="h-screen overflow-hidden flex">
        <SideNav className="h-full" />
        <div className="flex-1 h-full overflow-auto max-w-7xl mx-auto">
          <>
            <header className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">Admin</p>
                <Icons.ChevronLeft />
                <h2 className="font-bold">Page Not Found</h2>
              </div>
              <div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Icons.Bell />
                </button>
              </div>
            </header>
            <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                  404 - Admin Page Not Found
                </h1>
                <p className="text-muted-foreground">
                  The admin page you're looking for doesn't exist.
                </p>
              </div>
            </div>
          </>
        </div>
      </main>
    );
  }

  // For non-admin routes, show the regular not-found page
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}
