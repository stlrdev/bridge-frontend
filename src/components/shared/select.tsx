"use client";

import * as React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Search,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

// Enhanced Select with additional features
interface EnhancedSelectProps extends React.ComponentProps<
  typeof SelectPrimitive.Root
> {
  children: React.ReactNode;
  prefixIcon?: React.ReactNode;
  loading?: boolean;
  error?: string;
  helperText?: string;
  searchable?: boolean;
  placeholder?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  fullWidth?: boolean;
}

interface EnhancedSelectTriggerProps extends React.ComponentProps<
  typeof SelectPrimitive.Trigger
> {
  children?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  loading?: boolean;
  error?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  fullWidth?: boolean;
  placeholder?: string;
}

interface EnhancedSelectItemProps extends React.ComponentProps<
  typeof SelectPrimitive.Item
> {
  children: React.ReactNode;
  prefixIcon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

interface EnhancedSelectContentProps extends React.ComponentProps<
  typeof SelectPrimitive.Content
> {
  children: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

// Search state context
const SearchContext = React.createContext<{
  searchValue: string;
  setSearchValue: (value: string) => void;
}>({
  searchValue: "",
  setSearchValue: () => {},
});

// Enhanced Select Root
function EnhancedSelect({
  children,
  value,
  onValueChange,
  disabled,
  ...props
}: EnhancedSelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      {...props}
    >
      {children}
    </SelectPrimitive.Root>
  );
}

// Enhanced Select Trigger with prefix icon support
function EnhancedSelectTrigger({
  className,
  prefixIcon,
  loading,
  error,
  size = "default",
  variant = "default",
  fullWidth = false,
  placeholder,
  children,
  ...props
}: EnhancedSelectTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 px-2 py-1 text-xs",
    default: "h-9 px-3 py-2 text-sm",
    lg: "h-12 px-4 py-3 text-base",
  };

  const variantClasses = {
    default: "border border-input bg-background hover:bg-accent/50",
    outline: "border-2 border-input bg-transparent hover:border-ring",
    ghost: "border-transparent bg-transparent hover:bg-accent/50",
  };

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      data-variant={variant}
      className={cn(
        "flex items-center justify-between gap-2 rounded-md shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        error && "border-destructive focus-visible:ring-destructive/50",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {prefixIcon && (
          <span className="shrink-0 text-muted-foreground">{prefixIcon}</span>
        )}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <SelectPrimitive.Value placeholder={placeholder} />
        )}
      </div>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// Enhanced Select Content with search functionality
function EnhancedSelectContent({
  className,
  children,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found",
  position = "item-aligned",
  align = "center",
  ...props
}: EnhancedSelectContentProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredChildren, setFilteredChildren] =
    React.useState<React.ReactNode>(children);

  React.useEffect(() => {
    if (!searchable || !searchValue) {
      setFilteredChildren(children);
      return;
    }

    const filterChildren = (node: React.ReactNode): React.ReactNode => {
      if (React.isValidElement(node)) {
        const element = node as React.ReactElement<any>;
        if (element.type === React.Fragment) {
          return React.cloneElement(
            element,
            {},
            React.Children.map(element.props.children, filterChildren),
          );
        }

        if (
          element.props?.children &&
          typeof element.props.children === "string"
        ) {
          const text = element.props.children.toLowerCase();
          if (text.includes(searchValue.toLowerCase())) {
            return element;
          }
          return null;
        }

        if (element.props?.children) {
          return React.cloneElement(
            element,
            {},
            React.Children.map(element.props.children, filterChildren),
          );
        }
      }
      return node;
    };

    const filtered = React.Children.map(children, filterChildren);
    const hasValidItems = filtered?.some((child) => child !== null);

    setFilteredChildren(
      hasValidItems ? (
        filtered
      ) : (
        <div className="py-6 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ),
    );
  }, [searchValue, children, searchable, emptyMessage]);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="select-content"
          className={cn(
            "relative z-50 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className,
          )}
          position={position}
          align={align}
          {...props}
        >
          {searchable && (
            <div className="flex items-center gap-2 border-b p-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-sm"
                onClick={(e) => e.stopPropagation()}
              />
              {searchValue && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchValue("");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
          <SelectPrimitive.Viewport className="p-1">
            {filteredChildren}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SearchContext.Provider>
  );
}

// Enhanced Select Item with prefix icon and description
function EnhancedSelectItem({
  className,
  prefixIcon,
  description,
  disabled,
  children,
  ...props
}: EnhancedSelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      disabled={disabled}
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-2 pr-8 pl-2 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {prefixIcon && (
          <span className="shrink-0 text-muted-foreground">{prefixIcon}</span>
        )}
        <div className="flex flex-col min-w-0">
          <SelectPrimitive.ItemText className="truncate">
            {children}
          </SelectPrimitive.ItemText>
          {description && (
            <span className="text-xs text-muted-foreground truncate">
              {description}
            </span>
          )}
        </div>
      </div>
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

// Enhanced Select Label
function EnhancedSelectLabel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </SelectPrimitive.Label>
  );
}

// Enhanced Select Helper Text
function EnhancedSelectHelperText({
  className,
  error,
  children,
}: {
  className?: string;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-xs mt-1",
        error ? "text-destructive" : "text-muted-foreground",
        className,
      )}
    >
      {error && <AlertCircle className="inline h-3 w-3 mr-1" />}
      {children}
    </p>
  );
}

// Enhanced Select Group
function EnhancedSelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("space-y-1", className)}
      {...props}
    />
  );
}

// Enhanced Select Separator
function EnhancedSelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

// Convenience component that combines everything
interface SelectProps extends Omit<EnhancedSelectProps, "children"> {
  label?: string;
  options: Array<{
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
  }>;
  onValueChange?: (value: string) => void;
  className?: string;
  autoWidth?: boolean;
  defaultValue?: string;
}

// Hook to calculate text width
function useTextWidth(text: string, font: string = "14px system-ui") {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      setWidth(metrics.width);
    }
  }, [text, font]);

  return width;
}

function Select({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  error,
  helperText,
  prefixIcon,
  loading,
  searchable,
  placeholder = "Select an option...",
  size = "default",
  variant = "default",
  fullWidth = false,
  autoWidth = true,
  className,
  ...props
}: SelectProps) {
  // Handle controlled/uncontrolled state
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange],
  );
  // Find the longest option text for auto width calculation
  const longestText = React.useMemo(() => {
    const allTexts = options.map((opt) => opt.label);
    if (placeholder) allTexts.push(placeholder);
    return allTexts.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      "",
    );
  }, [options, placeholder]);

  // Calculate width based on size
  const fontSize = size === "sm" ? "12px" : size === "lg" ? "16px" : "14px";
  const textWidth = useTextWidth(longestText, `${fontSize} system-ui`);

  // Calculate total width including padding, icon, and dropdown arrow
  const padding = size === "sm" ? 32 : size === "lg" ? 48 : 40;
  const iconWidth = prefixIcon ? 24 : 0;
  const arrowWidth = 24;
  const totalWidth = autoWidth
    ? textWidth + padding + iconWidth + arrowWidth
    : undefined;
  return (
    <div className={cn("space-y-2", fullWidth && "w-full", className)}>
      <EnhancedSelect
        value={currentValue}
        onValueChange={handleValueChange}
        {...props}
      >
        {label && (
          <EnhancedSelectGroup>
            <EnhancedSelectLabel>{label}</EnhancedSelectLabel>
          </EnhancedSelectGroup>
        )}
        <EnhancedSelectTrigger
          prefixIcon={prefixIcon}
          loading={loading}
          error={error}
          size={size}
          variant={variant}
          fullWidth={fullWidth}
          placeholder={placeholder}
          style={{ width: totalWidth }}
        >
          <SelectPrimitive.Value />
        </EnhancedSelectTrigger>
        <EnhancedSelectContent searchable={searchable}>
          <EnhancedSelectGroup>
            {options.map((option) => (
              <EnhancedSelectItem
                key={option.value}
                value={option.value}
                prefixIcon={option.icon}
                description={option.description}
                disabled={option.disabled}
              >
                {option.label}
              </EnhancedSelectItem>
            ))}
          </EnhancedSelectGroup>
        </EnhancedSelectContent>
      </EnhancedSelect>
      {(error || helperText) && (
        <EnhancedSelectHelperText error={!!error}>
          {error || helperText}
        </EnhancedSelectHelperText>
      )}
    </div>
  );
}

export {
  EnhancedSelect as BaseSelect,
  EnhancedSelectContent as SelectContent,
  EnhancedSelectGroup as SelectGroup,
  EnhancedSelectItem as SelectItem,
  EnhancedSelectLabel as SelectLabel,
  EnhancedSelectTrigger as SelectTrigger,
  EnhancedSelectHelperText as SelectHelperText,
  EnhancedSelectSeparator as SelectSeparator,
  Select,
  type EnhancedSelectProps,
  type EnhancedSelectTriggerProps,
  type EnhancedSelectItemProps,
  type EnhancedSelectContentProps,
  type SelectProps,
};
