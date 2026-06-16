"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const navLinkVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        ghost: "text-foreground hover:text-primary",
        outline: "text-foreground hover:text-primary",
        secondary: "text-foreground hover:text-primary",
        destructive: "text-destructive hover:text-destructive/80",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
      active: {
        true: "text-primary font-semibold",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      active: false,
    },
  },
);

export interface NavLinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
  exact?: boolean;
  activeClassName?: string;
  onClick?: () => void;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      className,
      href,
      children,
      variant,
      size,
      icon,
      badge,
      disabled = false,
      external = false,
      exact = false,
      activeClassName,
      onClick,
      ...props
    },
    ref,
  ) => {
    const pathname = usePathname();

    // Determine if the link is active
    const isActive = exact
      ? pathname === href
      : pathname.startsWith(href) && href !== "/";

    const linkContent = (
      <>
        {icon && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
        {badge && (
          <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium min-w-5 h-5 px-1.5">
            {badge}
          </span>
        )}
      </>
    );

    const linkClasses = cn(
      navLinkVariants({ variant, size, active: isActive }),
      isActive && activeClassName,
      disabled && "opacity-50 cursor-not-allowed",
      className,
    );

    if (disabled) {
      return (
        <span className={linkClasses} ref={ref} {...props}>
          {linkContent}
        </span>
      );
    }

    if (external) {
      return (
        <a
          href={href}
          className={linkClasses}
          ref={ref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          {...props}
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={linkClasses}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {linkContent}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink, navLinkVariants };
