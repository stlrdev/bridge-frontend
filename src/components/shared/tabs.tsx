"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

// Enhanced tabs container with orientation and variant support
const tabsVariants = cva(
  "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-background border rounded-lg p-1",
        underline: "border-b",
        pills: "",
      },
      size: {
        default: "",
        sm: "gap-1",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TabsProps
  extends
    React.ComponentProps<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsVariants> {
  variant?: "default" | "card" | "underline" | "pills";
  size?: "default" | "sm" | "lg";
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      orientation = "horizontal",
      ...props
    },
    ref,
  ) => (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(tabsVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Tabs.displayName = "Tabs";

// Enhanced tabs list with multiple variants
const tabsListVariants = cva(
  "inline-flex w-fit items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "rounded-lg p-[3px] bg-muted",
        card: "w-full h-fit rounded-md bg-muted/50 p-1",
        underline: "h-10 w-fit gap-0 rounded-none bg-transparent border-0",
        pills: "gap-2 bg-transparent p-0",
      },
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-11",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col h-fit w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      orientation: "horizontal",
    },
  },
);

export interface TabsListProps
  extends
    React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  variant?: "default" | "card" | "underline" | "pills";
  size?: "default" | "sm" | "lg";
  orientation?: "horizontal" | "vertical";
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      orientation = "horizontal",
      ...props
    },
    ref,
  ) => (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        tabsListVariants({ variant, size, orientation }),
        "group-data-[orientation=horizontal]/tabs:h-full group-data-[orientation=vertical]/tabs:w-full",
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

// Enhanced tabs trigger with better styling and animations
const tabsTriggerVariants = cva(
  "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "flex-1 h-[calc(100%-1px)] rounded-md border border-transparent px-2 py-1 text-foreground/60 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        card: "flex-1 h-[calc(100%-6px)] rounded-md border border-transparent px-3 py-2 text-foreground/70 hover:text-foreground data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:shadow-sm data-[state=active]:text-foreground",
        underline:
          "h-full border-b-2 border-transparent px-3 py-2 text-foreground/60 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
        pills:
          "h-8 rounded-full px-4 py-1 text-foreground/60 hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
      },
      size: {
        default: "text-sm",
        sm: "text-xs px-2 py-1 h-7",
        lg: "text-base px-4 py-2 h-10",
      },
      orientation: {
        horizontal: "",
        vertical: "w-full justify-start",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      orientation: "horizontal",
    },
  },
);

export interface TabsTriggerProps
  extends
    React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  variant?: "default" | "card" | "underline" | "pills";
  size?: "default" | "sm" | "lg";
  orientation?: "horizontal" | "vertical";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  badge?: string | number;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      orientation = "horizontal",
      leftIcon,
      rightIcon,
      badge,
      children,
      ...props
    },
    ref,
  ) => (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(
        tabsTriggerVariants({ variant, size, orientation }),
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      {badge && (
        <span className="ml-1 min-w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center px-1">
          {badge}
        </span>
      )}
    </TabsPrimitive.Trigger>
  ),
);
TabsTrigger.displayName = "TabsTrigger";

// Enhanced tabs content with animations
const tabsContentVariants = cva("outline-none", {
  variants: {
    variant: {
      default: "flex-1",
      card: "mt-2 flex-1",
      underline: "mt-2 flex-1",
      pills: "mt-2 flex-1",
    },
    animation: {
      none: "",
      fade: "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0",
      slide:
        "data-[state=active]:animate-in data-[state=active]:slide-in-from-bottom-2 data-[state=inactive]:animate-out data-[state=inactive]:slide-out-to-bottom-2",
      scale:
        "data-[state=active]:animate-in data-[state=active]:zoom-in-95 data-[state=inactive]:animate-out data-[state=inactive]:zoom-out-95",
    },
  },
  defaultVariants: {
    variant: "default",
    animation: "none",
  },
});

export interface TabsContentProps
  extends
    React.ComponentProps<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {
  variant?: "default" | "card" | "underline" | "pills";
  animation?: "none" | "fade" | "slide" | "scale";
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant = "default", animation = "none", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(tabsContentVariants({ variant, animation }), className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

// Tab indicator for underline variant
const TabsIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { active: boolean }
>(({ className, active, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200",
      active ? "w-full" : "w-0",
      className,
    )}
    {...props}
  />
));
TabsIndicator.displayName = "TabsIndicator";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
  tabsVariants,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
};
