import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Info as InfoIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

const infoVariants = cva("flex gap-3 rounded-lg border p-4 text-sm", {
  variants: {
    variant: {
      default:
        "bg-primary/5 border-primary/20 text-primary dark:bg-primary/10 dark:border-primary/30",
      success:
        "bg-success/10 border-success/20 text-success dark:bg-success/5 dark:border-success/15",
      warning:
        "bg-warning/10 border-warning/20 text-warning dark:bg-warning/5 dark:border-warning/15",
      error:
        "bg-error/10 border-error/20 text-error dark:bg-error/5 dark:border-error/15",
      info: "bg-muted/50 border-muted text-muted-foreground dark:bg-muted/30 dark:border-muted/50",
    },
    size: {
      default: "p-4",
      sm: "p-3 text-xs",
      lg: "p-5 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconMap = {
  default: Lightbulb,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
  info: InfoIcon,
} as const;

interface InfoProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoVariants> {
  title?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

function Info({
  className,
  variant = "default",
  size = "default",
  title,
  showIcon = true,
  icon,
  children,
  ...props
}: InfoProps) {
  const IconComponent = iconMap[variant as keyof typeof iconMap];

  return (
    <div
      data-slot="info"
      data-variant={variant}
      data-size={size}
      className={cn(infoVariants({ variant, size, className }))}
      {...props}
    >
      {showIcon && (
        <div className="shrink-0 mt-0.5">
          {icon || <IconComponent className="size-4" />}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="space-y-1">{children}</div>
      </div>
    </div>
  );
}

export { Info, infoVariants };
