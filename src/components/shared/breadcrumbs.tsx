import * as React from "react";
import { useRouter } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const breadcrumbsVariants = cva("flex items-center text-sm", {
  variants: {
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
    },
    variant: {
      default: "text-muted-foreground",
      subtle: "text-muted-foreground/70",
      strong: "text-foreground",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

const breadcrumbItemVariants = cva(
  "flex items-center gap-1.5 transition-colors",
  {
    variants: {
      interactive: {
        true: "hover:text-foreground cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      interactive: true,
    },
  },
);

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

interface BreadcrumbProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbsVariants> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showHomeIcon?: boolean;
  homeIcon?: React.ReactNode;
  homeHref?: string;
  onHomeClick?: () => void;
  className?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      items,
      separator = <ChevronRight className="h-4 w-4" />,
      maxItems = 0,
      showHomeIcon = false,
      homeIcon,
      homeHref = "/",
      onHomeClick,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    const router = useRouter();
    const [expanded, setExpanded] = React.useState(false);

    const displayItems = React.useMemo(() => {
      if (maxItems <= 0 || items.length <= maxItems) {
        return items;
      }

      if (expanded) {
        return items;
      }

      const firstItems = items.slice(0, Math.floor(maxItems / 2));
      const lastItems = items.slice(-Math.floor(maxItems / 2));

      return [
        ...firstItems,
        {
          label: "...",
          isDisabled: true,
          icon: <MoreHorizontal className="h-4 w-4" />,
        },
        ...lastItems,
      ];
    }, [items, maxItems, expanded]);

    const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
      const isLast = index === displayItems.length - 1;
      const isInteractive =
        !item.isDisabled && !isLast && (item.href || item.onClick);

      return (
        <React.Fragment key={index}>
          <li
            className={cn(
              "inline-flex items-center align-middle transition-colors",
              isInteractive && "hover:text-foreground cursor-pointer",
              item.isActive && "text-foreground font-medium",
              item.isDisabled && "cursor-not-allowed opacity-60",
              !item.isActive && !isInteractive && "text-muted-foreground",
            )}
            onClick={() => {
              if (isInteractive) {
                if (item.onClick) {
                  item.onClick();
                } else if (item.href) {
                  router.push(item.href);
                }
              }
            }}
          >
            {item.icon && <span className="shrink-0 mr-1.5">{item.icon}</span>}
            <span>{item.label}</span>
          </li>
          {!isLast && (
            <span className="shrink-0 text-muted-foreground mx-1 inline-flex items-center align-middle">
              {separator}
            </span>
          )}
        </React.Fragment>
      );
    };

    return (
      <nav
        ref={ref}
        className={cn(breadcrumbsVariants({ size, variant }), className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className="flex items-center">
          {showHomeIcon && (
            <>
              <li className="flex items-center align-middle">
                <div
                  className={breadcrumbItemVariants({
                    interactive: !!onHomeClick || !!homeHref,
                  })}
                  onClick={() => {
                    if (onHomeClick) {
                      onHomeClick();
                    } else if (homeHref) {
                      router.push(homeHref);
                    }
                  }}
                >
                  {homeIcon || <ChevronRight className="h-4 w-4 rotate-180" />}
                </div>
              </li>
              <li className="shrink-0 text-muted-foreground mx-1 flex items-center">
                {separator}
              </li>
            </>
          )}
          {displayItems.map((item, index) => renderBreadcrumbItem(item, index))}
          {maxItems > 0 && items.length > maxItems && !expanded && (
            <li>
              <button
                onClick={() => setExpanded(true)}
                className="ml-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Show all
              </button>
            </li>
          )}
        </ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(
  (
    { className, children = <ChevronRight className="h-4 w-4" />, ...props },
    ref,
  ) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn("shrink-0 text-muted-foreground/50 mx-1", className)}
      {...props}
    >
      {children}
    </span>
  ),
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  href?: string;
  onClick?: () => void;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    { className, children, isActive, isDisabled, href, onClick, ...props },
    ref,
  ) => {
    const isInteractive = Boolean(!isDisabled && (href || onClick));

    return (
      <li
        ref={ref}
        className={cn("flex items-center gap-1.5", className)}
        {...props}
      >
        <div
          className={cn(
            breadcrumbItemVariants({ interactive: isInteractive }),
            isActive && "text-foreground font-medium",
            isDisabled && "cursor-not-allowed opacity-60",
          )}
          onClick={() => {
            if (isInteractive) {
              if (onClick) {
                onClick();
              } else if (href) {
                window.location.href = href;
              }
            }
          }}
        >
          {children}
        </div>
      </li>
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  isDisabled?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, isActive, isDisabled, href, onClick, ...props }, ref) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }

      if (onClick) {
        onClick(e);
      } else if (href) {
        e.preventDefault();
        router.push(href);
      }
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          "transition-colors",
          isActive && "text-foreground font-medium",
          isDisabled && "pointer-events-none opacity-60",
          !isActive && !isDisabled && "hover:text-foreground cursor-pointer",
          className,
        )}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-medium", className)}
      {...props}
    >
      {children}
    </span>
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  onClick?: () => void;
}

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, onClick, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex h-9 w-9 items-center justify-center",
      onClick && "cursor-pointer hover:text-foreground",
      className,
    )}
    onClick={onClick}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
));
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbsVariants,
  breadcrumbItemVariants,
  type BreadcrumbItem as BreadcrumbItemType,
};
