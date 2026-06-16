"use client";

export interface CompanyBranding {
  companyId: string;
  companyName: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
}
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const DEFAULT_BRANDING: CompanyBranding = {
  companyId: "default",
  companyName: "Bridge",
  primaryColor: "#F59E0B",
  secondaryColor: "#1E293B",
  accentColor: "#0EA5E9",
};

function hexToRgbTriplet(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);

  return `${r} ${g} ${b}`;
}

function applyBranding(branding: CompanyBranding) {
  const root = document.documentElement;

  root.style.setProperty("--color-brand-primary", branding.primaryColor);
  root.style.setProperty(
    "--color-brand-secondary",
    branding.secondaryColor ?? DEFAULT_BRANDING.secondaryColor!,
  );
  root.style.setProperty(
    "--color-brand-accent",
    branding.accentColor ?? DEFAULT_BRANDING.accentColor!,
  );

  try {
    root.style.setProperty(
      "--color-brand-primary-rgb",
      hexToRgbTriplet(branding.primaryColor),
    );
  } catch {}
}

interface ThemeContextValue {
  branding: CompanyBranding;
  setBranding: (branding: CompanyBranding) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  branding: DEFAULT_BRANDING,
  setBranding: () => {},
});

export function ThemeProvider({
  children,
  initialBranding = DEFAULT_BRANDING,
}: {
  children: ReactNode;
  initialBranding?: CompanyBranding;
}) {
  const [branding, setBrandingState] = useState<CompanyBranding>(
    initialBranding ?? DEFAULT_BRANDING,
  );

  const setBranding = (next: CompanyBranding) => {
    setBrandingState(next);
    applyBranding(next);
  };

  useEffect(() => {
    applyBranding(branding);
  }, [branding]);

  return (
    <ThemeContext.Provider value={{ branding, setBranding }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
