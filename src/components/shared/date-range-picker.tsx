"use client";

import * as React from "react";
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { type DateRange } from "react-day-picker";

import {
  DatePickerInput,
  type DatePickerInputProps,
  type DateFormat,
} from "@/components/shared/date-picker-input";
import { cn } from "@/lib/utils";

// Preset date range options
export type DateRangePreset =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "nextMonth"
  | "thisYear"
  | "lastYear"
  | "nextYear"
  | "last7Days"
  | "next7Days"
  | "last14Days"
  | "next14Days"
  | "last30Days"
  | "next30Days"
  | "last90Days"
  | "next90Days"
  | "custom";

export interface DateRangePresetOption {
  label: string;
  value: DateRangePreset;
  getDateRange: () => DateRange;
}

// Default preset configurations
const defaultPresets: Record<DateRangePreset, DateRangePresetOption> = {
  today: {
    label: "Today",
    value: "today",
    getDateRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    }),
  },
  yesterday: {
    label: "Yesterday",
    value: "yesterday",
    getDateRange: () => ({
      from: startOfDay(addDays(new Date(), -1)),
      to: endOfDay(addDays(new Date(), -1)),
    }),
  },
  thisWeek: {
    label: "This Week",
    value: "thisWeek",
    getDateRange: () => {
      const now = new Date();
      return {
        from: startOfWeek(now, { weekStartsOn: 1 }),
        to: endOfWeek(now, { weekStartsOn: 1 }),
      };
    },
  },
  lastWeek: {
    label: "Last Week",
    value: "lastWeek",
    getDateRange: () => {
      const now = new Date();
      const lastWeekStart = addWeeks(startOfWeek(now, { weekStartsOn: 1 }), -1);
      return {
        from: lastWeekStart,
        to: endOfWeek(lastWeekStart, { weekStartsOn: 1 }),
      };
    },
  },
  thisMonth: {
    label: "This Month",
    value: "thisMonth",
    getDateRange: () => {
      const now = new Date();
      return {
        from: startOfMonth(now),
        to: endOfMonth(now),
      };
    },
  },
  lastMonth: {
    label: "Last Month",
    value: "lastMonth",
    getDateRange: () => {
      const now = new Date();
      const lastMonthStart = startOfMonth(addMonths(now, -1));
      return {
        from: lastMonthStart,
        to: endOfMonth(lastMonthStart),
      };
    },
  },
  nextMonth: {
    label: "Next Month",
    value: "nextMonth",
    getDateRange: () => {
      const now = new Date();
      const nextMonthStart = startOfMonth(addMonths(now, 1));
      return {
        from: nextMonthStart,
        to: endOfMonth(nextMonthStart),
      };
    },
  },
  thisYear: {
    label: "This Year",
    value: "thisYear",
    getDateRange: () => {
      const now = new Date();
      return {
        from: startOfYear(now),
        to: endOfYear(now),
      };
    },
  },
  lastYear: {
    label: "Last Year",
    value: "lastYear",
    getDateRange: () => {
      const now = new Date();
      const lastYearStart = startOfYear(addYears(now, -1));
      return {
        from: lastYearStart,
        to: endOfYear(lastYearStart),
      };
    },
  },
  nextYear: {
    label: "Next Year",
    value: "nextYear",
    getDateRange: () => {
      const now = new Date();
      const nextYearStart = startOfYear(addYears(now, 1));
      return {
        from: nextYearStart,
        to: endOfYear(nextYearStart),
      };
    },
  },
  last7Days: {
    label: "Last 7 Days",
    value: "last7Days",
    getDateRange: () => ({
      from: startOfDay(addDays(new Date(), -6)),
      to: endOfDay(new Date()),
    }),
  },
  last14Days: {
    label: "Last 14 Days",
    value: "last14Days",
    getDateRange: () => ({
      from: startOfDay(addDays(new Date(), -13)),
      to: endOfDay(new Date()),
    }),
  },
  last30Days: {
    label: "Last 30 Days",
    value: "last30Days",
    getDateRange: () => ({
      from: startOfDay(addDays(new Date(), -29)),
      to: endOfDay(new Date()),
    }),
  },
  last90Days: {
    label: "Last 90 Days",
    value: "last90Days",
    getDateRange: () => ({
      from: startOfDay(addDays(new Date(), -89)),
      to: endOfDay(new Date()),
    }),
  },
  next7Days: {
    label: "Next 7 Days",
    value: "next7Days",
    getDateRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(addDays(new Date(), 6)),
    }),
  },
  next14Days: {
    label: "Next 14 Days",
    value: "next14Days",
    getDateRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(addDays(new Date(), 13)),
    }),
  },
  next30Days: {
    label: "Next 30 Days",
    value: "next30Days",
    getDateRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(addDays(new Date(), 29)),
    }),
  },
  next90Days: {
    label: "Next 90 Days",
    value: "next90Days",
    getDateRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(addDays(new Date(), 89)),
    }),
  },
  custom: {
    label: "Custom",
    value: "custom",
    getDateRange: () => ({ from: undefined, to: undefined }),
  },
};

export interface DateRangePickerProps extends Omit<
  DatePickerInputProps,
  "mode" | "value" | "defaultValue" | "onChange"
> {
  // Core date range functionality
  value?: DateRange | undefined;
  defaultValue?: DateRange | undefined;
  onChange?: (range: DateRange | undefined) => void;

  // Preset functionality
  enablePresets?: boolean;
  presets?: DateRangePreset[];
  customPresets?: DateRangePresetOption[];
  presetPosition?: "top" | "bottom" | "left" | "right";
  onPresetSelect?: (preset: DateRangePreset, range: DateRange) => void;

  // Display customization
  separator?: string;
  placeholder?: string;
  emptyLabel?: string;

  // Validation
  minDays?: number;
  maxDays?: number;
  requireBothDates?: boolean;
  validateRange?: (range: DateRange | undefined) => string | null;

  // Layout
  showPresetButtons?: boolean;
  presetButtonVariant?: "default" | "outline" | "ghost" | "secondary";
  presetButtonSize?: "sm" | "md" | "lg";

  // Events
  onRangeStart?: (date: Date | undefined) => void;
  onRangeEnd?: (date: Date | undefined) => void;
  onRangeComplete?: (range: DateRange) => void;
}

export function DateRangePicker({
  // Core functionality
  value,
  defaultValue,
  onChange,

  // Preset functionality
  enablePresets = false,
  presets = ["last7Days", "last30Days", "thisMonth", "custom"],
  customPresets = [],
  presetPosition = "bottom",
  onPresetSelect,

  // Display customization
  separator = " - ",
  placeholder = "Select date range",
  emptyLabel = "Select date range",

  // Validation
  minDays,
  maxDays,
  requireBothDates = false,
  validateRange,

  // Layout
  showPresetButtons = true,
  presetButtonVariant = "outline",
  presetButtonSize = "sm",

  // Events
  onRangeStart,
  onRangeEnd,
  onRangeComplete,

  // Pass through to DatePickerInput
  ...datePickerProps
}: DateRangePickerProps) {
  const [internalValue, setInternalValue] = React.useState<
    DateRange | undefined
  >(
    defaultValue || {
      from: new Date(new Date().getFullYear(), 0, 20),
      to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    },
  );

  // Determine if component is controlled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Validation error state
  const [validationError, setValidationError] = React.useState<string | null>(
    null,
  );

  // Combine default and custom presets
  const allPresets = React.useMemo(() => {
    const defaultOptions = presets
      .map((preset) => defaultPresets[preset])
      .filter(Boolean);
    return [...defaultOptions, ...customPresets];
  }, [presets, customPresets]);

  // Custom validation
  const customValidateRange = React.useCallback(
    (range: DateRange | undefined): string | null => {
      // Custom validation function
      if (validateRange) {
        const customError = validateRange(range);
        if (customError) return customError;
      }

      // Built-in validations
      if (!range?.from) {
        return requireBothDates ? "Start date is required" : null;
      }

      if (requireBothDates && !range?.to) {
        return "End date is required";
      }

      if (range?.from && range?.to) {
        const days = Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (minDays !== undefined && days < minDays) {
          return `Minimum ${minDays} days required`;
        }

        if (maxDays !== undefined && days > maxDays) {
          return `Maximum ${maxDays} days allowed`;
        }

        if (range.to < range.from) {
          return "End date must be after start date";
        }
      }

      return null;
    },
    [validateRange, requireBothDates, minDays, maxDays],
  );

  // Handle value change
  const handleValueChange = React.useCallback(
    (newRange: DateRange | undefined) => {
      if (!isControlled) {
        setInternalValue(newRange);
      }

      // Validate the new range
      const error = customValidateRange(newRange);
      setValidationError(error);

      // Trigger range-specific events
      if (newRange?.from && newRange.from !== currentValue?.from) {
        onRangeStart?.(newRange.from);
      }

      if (newRange?.to && newRange.to !== currentValue?.to) {
        onRangeEnd?.(newRange.to);
      }

      if (newRange?.from && newRange?.to) {
        onRangeComplete?.(newRange);
      }

      onChange?.(newRange);
    },
    [
      isControlled,
      currentValue,
      onChange,
      onRangeStart,
      onRangeEnd,
      onRangeComplete,
      customValidateRange,
    ],
  );

  // Handle preset selection
  const handlePresetSelect = React.useCallback(
    (preset: DateRangePresetOption) => {
      const range = preset.getDateRange();
      handleValueChange(range);
      onPresetSelect?.(preset.value, range);
    },
    [handleValueChange, onPresetSelect],
  );

  // Preset buttons component
  const PresetButtons =
    enablePresets && showPresetButtons && allPresets.length > 0 ? (
      <div
        className={cn(
          "flex gap-2 overflow-x-auto scrollbar-hide",
          presetPosition === "bottom" && "mt-3",
          presetPosition === "left" && "flex-col mr-3 overflow-x-auto",
          presetPosition === "right" && "flex-col ml-3 overflow-x-auto",
        )}
      >
        {allPresets.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => handlePresetSelect(preset)}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors whitespace-nowrap shrink-0",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              presetButtonVariant === "default" &&
                "bg-primary text-primary-foreground hover:bg-primary/90",
              presetButtonVariant === "outline" &&
                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
              presetButtonVariant === "ghost" &&
                "hover:bg-accent hover:text-accent-foreground",
              presetButtonVariant === "secondary" &&
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              presetButtonSize === "sm" && "h-7 px-2 text-xs",
              presetButtonSize === "md" && "h-8 px-3 text-sm",
              presetButtonSize === "lg" && "h-9 px-4 text-base",
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <div
      className={cn(
        presetPosition === "left" && "flex",
        presetPosition === "right" && "flex flex-row-reverse",
      )}
    >
      {presetPosition === "top" && PresetButtons}
      {(presetPosition === "left" || presetPosition === "right") &&
        PresetButtons}

      <div className="w-full">
        <DatePickerInput
          {...datePickerProps}
          mode="range"
          value={currentValue}
          onChange={(value: DateRange | Date | Date[] | undefined) => {
            // Filter to only handle DateRange values
            if (
              value === undefined ||
              (typeof value === "object" && "from" in value)
            ) {
              handleValueChange(value as DateRange | undefined);
            }
          }}
          placeholder={placeholder}
          errorMessage={validationError || datePickerProps.errorMessage}
        />
        {presetPosition === "bottom" && (
          <div className="w-full mt-3">{PresetButtons}</div>
        )}
      </div>
    </div>
  );
}
