"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme?: "light" | "dark" | "auto";
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showEllipsis?: boolean;
  showPreviousNext?: boolean;
}

const getThemeClasses = (
  theme: "light" | "dark" | "auto",
  variant: "default" | "outline" | "ghost",
) => {
  const baseClasses =
    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantClasses = {
    default: {
      light:
        "bg-background border border-border hover:bg-accent hover:text-accent-foreground text-foreground",
      dark: "bg-background border border-border hover:bg-accent hover:text-accent-foreground text-foreground",
      auto: "bg-background border border-border hover:bg-accent hover:text-accent-foreground text-foreground",
    },
    outline: {
      light:
        "border border-border bg-background hover:bg-accent hover:text-accent-foreground text-foreground",
      dark: "border border-border bg-input/30 hover:bg-input/50 text-foreground",
      auto: "border border-border bg-background hover:bg-accent hover:text-accent-foreground text-foreground dark:bg-input/30 dark:hover:bg-input/50",
    },
    ghost: {
      light: "hover:bg-accent hover:text-accent-foreground text-foreground",
      dark: "hover:bg-accent/50 hover:text-accent-foreground text-foreground",
      auto: "hover:bg-accent hover:text-accent-foreground text-foreground dark:hover:bg-accent/50",
    },
  };

  return `${baseClasses} ${variantClasses[variant][theme]}`;
};

const getActiveThemeClasses = (theme: "light" | "dark" | "auto") => {
  const baseClasses =
    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer text-white";

  const themeClasses = {
    light: "bg-primary hover:bg-primary/90",
    dark: "bg-primary hover:bg-primary/90",
    auto: "bg-primary hover:bg-primary/90",
  };

  return `${baseClasses} ${themeClasses[theme]}`;
};

const getSizeClasses = (size: "sm" | "md" | "lg") => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };
  return sizeClasses[size];
};

const PageButton = ({
  page,
  currentPage,
  onPageChange,
  theme = "auto",
  variant = "default",
  size = "md",
}: {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  theme?: "light" | "dark" | "auto";
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}) => {
  const isActive = currentPage === page;
  const baseClasses = getThemeClasses(theme, variant);
  const activeClasses = getActiveThemeClasses(theme);
  const sizeClasses = getSizeClasses(size);

  const buttonClasses = cn(
    isActive ? activeClasses : baseClasses,
    sizeClasses,
    isActive && "ring-2 ring-ring/20 ring-offset-2 ring-offset-background",
  );

  return (
    <Button
      aria-label={`Go to page ${page}`}
      className={buttonClasses}
      variant={isActive ? "default" : "outline"}
      onClick={() => onPageChange(page)}
      disabled={isActive}
      size={size === "sm" ? "xs" : size === "lg" ? "default" : "sm"}
    >
      {page}
    </Button>
  );
};

const PreviousButton = ({
  currentPage,
  onPageChange,
  theme = "auto",
  variant = "default",
  size = "md",
  showPreviousNext = true,
}: {
  currentPage: number;
  onPageChange: (page: number) => void;
  theme?: "light" | "dark" | "auto";
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showPreviousNext?: boolean;
}) => {
  if (!showPreviousNext) return null;

  const baseClasses = getThemeClasses(theme, variant);
  const sizeClasses = getSizeClasses(size);
  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  return (
    <Button
      aria-label="Previous page"
      className={cn(baseClasses, sizeClasses, "flex items-center gap-1")}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      variant="outline"
      size={size === "sm" ? "xs" : size === "lg" ? "default" : "sm"}
    >
      <ChevronLeft size={iconSize} />
      {size !== "sm" && "Previous"}
    </Button>
  );
};

const NextButton = ({
  currentPage,
  totalPages,
  onPageChange,
  theme = "auto",
  variant = "default",
  size = "md",
  showPreviousNext = true,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme?: "light" | "dark" | "auto";
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showPreviousNext?: boolean;
}) => {
  if (!showPreviousNext) return null;

  const baseClasses = getThemeClasses(theme, variant);
  const sizeClasses = getSizeClasses(size);
  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  return (
    <Button
      aria-label="Next page"
      className={cn(baseClasses, sizeClasses, "flex items-center gap-1")}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      variant="outline"
      size={size === "sm" ? "xs" : size === "lg" ? "default" : "sm"}
    >
      {size !== "sm" && "Next"}
      <ChevronRight size={iconSize} />
    </Button>
  );
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  theme = "auto",
  variant = "default",
  size = "md",
  className,
  showEllipsis = true,
  showPreviousNext = true,
}: PaginationProps) {
  const pagination: React.ReactNode[] = [];
  const containerClasses = cn(
    "flex flex-wrap items-center gap-2",
    theme === "dark" && "dark",
    className,
  );

  pagination.push(
    <PreviousButton
      key="previous-button"
      currentPage={currentPage}
      onPageChange={onPageChange}
      theme={theme}
      variant={variant}
      size={size}
      showPreviousNext={showPreviousNext}
    />,
  );

  if (totalPages <= 8) {
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <PageButton
          key={i}
          page={i}
          currentPage={currentPage}
          onPageChange={onPageChange}
          theme={theme}
          variant={variant}
          size={size}
        />,
      );
    }
  } else {
    pagination.push(
      <PageButton
        key={1}
        page={1}
        currentPage={currentPage}
        onPageChange={onPageChange}
        theme={theme}
        variant={variant}
        size={size}
      />,
    );

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2 && showEllipsis) {
      pagination.push(
        <span
          key="start-ellipsis"
          className={cn(
            "px-2 text-muted-foreground",
            size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
          )}
        >
          ...
        </span>,
      );
    }

    for (let i = start; i <= end; i++) {
      pagination.push(
        <PageButton
          key={i}
          page={i}
          currentPage={currentPage}
          onPageChange={onPageChange}
          theme={theme}
          variant={variant}
          size={size}
        />,
      );
    }

    if (end < totalPages - 1 && showEllipsis) {
      pagination.push(
        <span
          key="end-ellipsis"
          className={cn(
            "px-2 text-muted-foreground",
            size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
          )}
        >
          ...
        </span>,
      );
    }

    pagination.push(
      <PageButton
        key={totalPages}
        page={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        theme={theme}
        variant={variant}
        size={size}
      />,
    );
  }

  pagination.push(
    <NextButton
      key="next-button"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      theme={theme}
      variant={variant}
      size={size}
      showPreviousNext={showPreviousNext}
    />,
  );

  return <div className={containerClasses}>{pagination}</div>;
}
