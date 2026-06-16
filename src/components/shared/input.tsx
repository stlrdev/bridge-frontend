import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

// Enhanced input variants with multiple styles
const inputVariants = cva(
  "flex w-full min-w-0 transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-input bg-transparent shadow-xs px-3 py-1 text-base focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-input/30",
        filled:
          "rounded-md border-0 bg-muted px-3 py-1 text-base focus-visible:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-muted",
        outlined:
          "rounded-lg border-2 border-input bg-transparent px-3 py-1 text-base focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm",
        underlined:
          "rounded-none border-0 border-b-2 border-input bg-transparent px-1 py-1 text-base focus-visible:border-ring focus-visible:ring-0 md:text-sm",
        ghost:
          "border-0 bg-transparent px-3 py-1 text-base focus-visible:bg-muted focus-visible:ring-0 md:text-sm dark:focus-visible:bg-muted/50",
        success:
          "rounded-md border border-green-500 bg-transparent px-3 py-1 text-base focus-visible:border-green-600 focus-visible:ring-[3px] focus-visible:ring-green-500/20 md:text-sm",
        warning:
          "rounded-md border border-yellow-500 bg-transparent px-3 py-1 text-base focus-visible:border-yellow-600 focus-visible:ring-[3px] focus-visible:ring-yellow-500/20 md:text-sm",
        error:
          "rounded-md border border-destructive bg-transparent px-3 py-1 text-base focus-visible:border-destructive focus-visible:ring-[3px] focus-visible:ring-destructive/50 md:text-sm",
        glass:
          "rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-base text-white focus-visible:border-white/40 focus-visible:ring-[3px] focus-visible:ring-white/20 md:text-sm placeholder:text-white/60 dark:bg-black/10 dark:border-white/10 dark:text-white dark:placeholder:text-white/60",
      },
      size: {
        xs: "h-6 text-xs px-2 py-0.5",
        sm: "h-8 text-sm px-2.5 py-1",
        default: "h-9 text-base px-3 py-1 md:text-sm",
        lg: "h-10 text-base px-4 py-2",
        xl: "h-12 text-lg px-6 py-3",
        "2xl": "h-14 text-xl px-8 py-4",
      },
      state: {
        default: "",
        success:
          "border-green-500 focus-visible:border-green-600 focus-visible:ring-green-500/20",
        warning:
          "border-yellow-500 focus-visible:border-yellow-600 focus-visible:ring-yellow-500/20",
        error:
          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
        disabled: "opacity-50 cursor-not-allowed",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
      radius: "md",
    },
  },
);

export interface InputProps
  extends
    Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  variant?:
    | "default"
    | "filled"
    | "outlined"
    | "underlined"
    | "ghost"
    | "success"
    | "warning"
    | "error"
    | "glass";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl";
  state?: "default" | "success" | "warning" | "error" | "disabled";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  leftElementClassName?: string;
  rightElementClassName?: string;
  containerClassName?: string;
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  loading?: boolean;
  loadingElement?: React.ReactNode;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      radius,
      leftElement,
      rightElement,
      leftElementClassName,
      rightElementClassName,
      containerClassName,
      error,
      success,
      warning,
      loading,
      loadingElement,
      errorMessage,
      helperText,
      label,
      fullWidth = false,
      disabled,
      type,
      ...props
    },
    ref,
  ) => {
    // Determine the current state based on props
    const currentState = React.useMemo(() => {
      if (disabled || state === "disabled") return "disabled";
      if (error || state === "error" || errorMessage) return "error";
      if (success || state === "success") return "success";
      if (warning || state === "warning") return "warning";
      if (loading) return "loading";
      return state || "default";
    }, [disabled, error, success, warning, loading, state, errorMessage]);

    // Default loading spinner
    const defaultLoadingElement = (
      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
    );

    // Combine variant classes with state-specific classes
    const inputClasses = cn(
      inputVariants({ variant, size, radius }),
      // Override variant with state if needed
      currentState === "error" && inputVariants({ state: "error" }),
      currentState === "success" && inputVariants({ state: "success" }),
      currentState === "warning" && inputVariants({ state: "warning" }),
      currentState === "disabled" && inputVariants({ state: "disabled" }),
      // Adjust padding when leftElement/rightElement are present
      leftElement && "pl-0",
      rightElement && "pr-0",
      className,
    );

    // Render left element with proper styling
    const renderLeftElement = () => {
      if (!leftElement && !loading) return null;

      const element = loading
        ? loadingElement || defaultLoadingElement
        : leftElement;

      return (
        <div
          className={cn(
            "flex items-center justify-center text-muted-foreground",
            // Use flexible sizing when custom className is present
            !(leftElementClassName || rightElementClassName || className) &&
              size === "xs" &&
              "px-1.5 h-6",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "sm" &&
              "px-2 h-8",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "default" &&
              "px-3 h-9",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "lg" &&
              "px-3 h-10",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "xl" &&
              "px-4 h-12",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "2xl" &&
              "px-6 h-14",
            // Default padding when no custom sizing
            !className && !leftElementClassName && "px-3",
            leftElementClassName,
          )}
        >
          {element}
        </div>
      );
    };

    // Render right element with proper styling
    const renderRightElement = () => {
      if (!rightElement && !loading) return null;

      const element = loading
        ? loadingElement || defaultLoadingElement
        : rightElement;

      return (
        <div
          className={cn(
            "flex items-center justify-center text-muted-foreground",
            // Use flexible sizing when custom className is present
            !(leftElementClassName || rightElementClassName || className) &&
              size === "xs" &&
              "px-1.5 h-6",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "sm" &&
              "px-2 h-8",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "default" &&
              "px-3 h-9",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "lg" &&
              "px-3 h-10",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "xl" &&
              "px-4 h-12",
            !(leftElementClassName || rightElementClassName || className) &&
              size === "2xl" &&
              "px-6 h-14",
            // Default padding when no custom sizing
            !className && !rightElementClassName && "px-3",
            rightElementClassName,
          )}
        >
          {element}
        </div>
      );
    };

    // Helper text component
    const renderHelperText = () => {
      if (!errorMessage && !helperText) return null;

      return (
        <p
          className={cn(
            "text-xs mt-1",
            errorMessage ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {errorMessage && <AlertCircle className="inline h-3 w-3 mr-1" />}
          {errorMessage || helperText}
        </p>
      );
    };

    // If no leftElement or rightElement, render simple input
    if (!leftElement && !rightElement && !loading) {
      return (
        <div className={cn(fullWidth && "w-full")}>
          {label && (
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
              {label}
            </label>
          )}
          <input
            type={type}
            className={inputClasses}
            disabled={disabled || currentState === "disabled"}
            ref={ref}
            {...props}
          />
          {renderHelperText()}
        </div>
      );
    }

    // Render input with leftElement/rightElement wrapper
    return (
      <div className={cn(fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center w-full transition-all",
            // Apply variant backgrounds, but allow override via className
            variant === "filled" &&
              !(leftElement || rightElement) &&
              "bg-muted dark:bg-muted",
            variant === "glass" &&
              !(leftElement || rightElement) &&
              "bg-white/10 backdrop-blur-sm border border-white/20 dark:bg-black/10 dark:border-white/10",
            // Apply only border radius and size to container, not full input variants
            radius === "none" && "rounded-none",
            radius === "sm" && "rounded-sm",
            radius === "md" && "rounded-md",
            radius === "lg" && "rounded-lg",
            radius === "xl" && "rounded-xl",
            radius === "full" && "rounded-full",
            // Apply size, but allow override via className when elements are present
            !(leftElement || rightElement) && size === "xs" && "h-6",
            !(leftElement || rightElement) && size === "sm" && "h-8",
            !(leftElement || rightElement) && size === "default" && "h-9",
            !(leftElement || rightElement) && size === "lg" && "h-10",
            !(leftElement || rightElement) && size === "xl" && "h-12",
            !(leftElement || rightElement) && size === "2xl" && "h-14",
            // Apply border styles for variants that need them
            (variant === "default" ||
              variant === "outlined" ||
              variant === "success" ||
              variant === "warning" ||
              variant === "error") &&
              "border border-input",
            variant === "outlined" && "border-2",
            variant === "underlined" && "border-0 border-b-2",
            variant === "glass" &&
              "border border-white/20 dark:border-white/10",
            // Always apply error state border regardless of variant
            currentState === "error" && "border-destructive",
            // Focus states
            "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
            currentState === "error" &&
              "focus-within:border-destructive focus-within:ring-destructive/50",
            currentState === "success" &&
              "border-green-500 focus-within:border-green-600 focus-within:ring-green-500/20",
            currentState === "warning" &&
              "border-yellow-500 focus-within:border-yellow-600 focus-within:ring-yellow-500/20",
            // Apply custom className to wrapper when elements are present
            (leftElement || rightElement) && className,
            containerClassName,
          )}
        >
          {renderLeftElement()}
          <input
            type={type}
            className={cn(
              "flex-1 bg-transparent border-0 outline-none shadow-none",
              "focus:ring-0 focus:outline-none",
              "selection:bg-primary selection:text-primary-foreground",
              leftElement && "pl-0",
              rightElement && "pr-0",
              // Use flexible sizing when custom className is present
              !(leftElementClassName || rightElementClassName || className) &&
                size === "xs" &&
                "h-6 text-xs px-2 py-0.5",
              !(leftElementClassName || rightElementClassName || className) &&
                size === "sm" &&
                "h-8 text-sm px-2.5 py-1",
              !(leftElementClassName || rightElementClassName || className) &&
                size === "default" &&
                "h-9 text-base px-3 py-1 md:text-sm",
              !(leftElementClassName || rightElementClassName || className) &&
                size === "lg" &&
                "h-10 text-base px-4 py-2",
              !(leftElementClassName || rightElementClassName || className) &&
                size === "xl" &&
                "h-12 text-lg px-6 py-3",
              !(leftElementClassName || rightElementClassName || className) &&
                size === "2xl" &&
                "h-14 text-xl px-8 py-4",
              // Default padding when no custom sizing
              !className && "px-3 py-2",
              className,
            )}
            disabled={disabled || currentState === "disabled"}
            ref={ref}
            {...props}
          />
          {renderRightElement()}
        </div>
        {renderHelperText()}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
