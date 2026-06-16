"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    return () => {
      // Don't add dark class back on unmount as other layouts will handle it
    };
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
