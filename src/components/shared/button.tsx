import * as React from "react";
import { Loader2, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

// Enhanced button variants with additional options
const buttonVariants = cva(
  "inline-flex cursor-pointer shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40",
        warning:
          "bg-yellow-600 text-white hover:bg-yellow-700 focus-visible:ring-yellow-500/20 dark:focus-visible:ring-yellow-500/40",
        info: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-500/40",
        gradient:
          "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus-visible:ring-purple-500/20 dark:focus-visible:ring-purple-500/40",
        glass:
          "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 dark:bg-black/10 dark:border-white/10 dark:hover:bg-black/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-lg px-8 text-base has-[>svg]:px-6 [&_svg:not([class*='size-'])]:size-5",
        "2xl":
          "h-14 rounded-lg px-10 text-lg has-[>svg]:px-8 [&_svg:not([class*='size-'])]:size-6",
        "3xl":
          "h-16 rounded-xl px-12 text-xl has-[>svg]:px-10 [&_svg:not([class*='size-'])]:size-7",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      state: {
        default: "",
        loading: "cursor-wait opacity-80",
        success: "cursor-default",
        error: "cursor-not-allowed",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  },
);

export interface EnhancedButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | "warning"
    | "info"
    | "gradient"
    | "glass";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
  state?: "default" | "loading" | "success" | "error" | "disabled";
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  loadingIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconPosition?: "left" | "right" | "both";
  fullWidth?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animation?: "none" | "pulse" | "bounce" | "spin";
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      state = "default",
      loading = false,
      success = false,
      error = false,
      disabled = false,
      loadingText,
      successText,
      errorText,
      loadingIcon,
      successIcon,
      errorIcon,
      leftIcon,
      rightIcon,
      iconPosition = "left",
      fullWidth = false,
      rounded = "md",
      animation = "none",
      children,
      asChild = false,
      href,
      ...props
    },
    ref,
  ) => {
    // Determine the current state
    const currentState = React.useMemo(() => {
      if (disabled || state === "disabled") return "disabled";
      if (loading || state === "loading") return "loading";
      if (success || state === "success") return "success";
      if (error || state === "error") return "error";
      return "default";
    }, [disabled, loading, success, error, state]);

    // Get the appropriate icon based on state
    const getStateIcon = () => {
      switch (currentState) {
        case "loading":
          return loadingIcon || <Loader2 className="animate-spin" />;
        case "success":
          return successIcon || <CheckCircle />;
        case "error":
          return errorIcon || <XCircle />;
        default:
          return null;
      }
    };

    // Get the appropriate text based on state
    const getStateText = () => {
      switch (currentState) {
        case "loading":
          return loadingText;
        case "success":
          return successText;
        case "error":
          return errorText;
        default:
          return null;
      }
    };

    // Determine which icons to show
    const stateIcon = getStateIcon();
    const stateText = getStateText();
    const shouldShowLeftIcon =
      (iconPosition === "left" || iconPosition === "both") &&
      (leftIcon || stateIcon);
    const shouldShowRightIcon =
      (iconPosition === "right" || iconPosition === "both") &&
      (rightIcon || stateIcon);

    // Animation classes
    const animationClasses = {
      none: "",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      spin: "animate-spin",
    };

    // Rounded classes
    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    };

    // Combine all variant classes
    const variantClasses = cn(
      buttonVariants({ variant, size, state: currentState }),
      roundedClasses[rounded],
      animationClasses[animation],
      fullWidth && "w-full",
      className,
    );

    // Render content based on state
    const renderContent = () => {
      if (stateText && currentState !== "default") {
        return (
          <>
            {shouldShowLeftIcon && (
              <span className="shrink-0">{stateIcon || leftIcon}</span>
            )}
            <span>{stateText}</span>
            {shouldShowRightIcon && (
              <span className="shrink-0">{stateIcon || rightIcon}</span>
            )}
          </>
        );
      }

      return (
        <>
          {shouldShowLeftIcon && (
            <span className="shrink-0">
              {currentState !== "default" && stateIcon ? stateIcon : leftIcon}
            </span>
          )}
          {children}
          {shouldShowRightIcon && (
            <span className="shrink-0">
              {currentState !== "default" && stateIcon ? stateIcon : rightIcon}
            </span>
          )}
        </>
      );
    };

    const Comp = asChild ? Slot.Root : "button";

    // If href is provided, render as Next.js Link with button styling
    if (href) {
      const { href: _, ...linkProps } = props as any;
      return (
        <Link
          href={href}
          className={variantClasses}
          data-slot="button"
          data-variant={variant}
          data-size={size}
          data-state={currentState}
          {...linkProps}
        >
          {renderContent()}
        </Link>
      );
    }

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        data-state={currentState}
        className={variantClasses}
        disabled={currentState === "disabled" || currentState === "loading"}
        {...props}
      >
        {renderContent()}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
