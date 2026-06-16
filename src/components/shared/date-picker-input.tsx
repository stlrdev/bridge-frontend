"use client";

import * as React from "react";
import { CalendarIcon, AlertCircle } from "lucide-react";
import type { DateRange as DayPickerDateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Types
export type DatePickerMode = "single" | "range" | "multiple";
export type DatePickerVariant = "default" | "inline" | "minimal" | "compact";
export type DatePickerSize = "sm" | "md" | "lg";
export type DateFormat = "full" | "long" | "medium" | "short" | "custom";

export type DateRange = DayPickerDateRange;

export interface DatePickerInputProps {
  // Core functionality
  value?: Date | Date[] | DateRange | undefined;
  defaultValue?: Date | Date[] | DateRange | undefined;
  onChange?: (value: Date | Date[] | DateRange | undefined) => void;
  mode?: DatePickerMode;

  // Display and formatting
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string | string[];
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  dateFormat?: DateFormat;
  customDateFormat?: Intl.DateTimeFormatOptions;
  locale?: string;

  // Variants and styling
  variant?: DatePickerVariant;
  size?: DatePickerSize;
  className?: string;
  fieldClassName?: string;
  inputClassName?: string;
  calendarClassName?: string;

  // Layout
  orientation?: "vertical" | "horizontal" | "responsive";
  addonPosition?: "start" | "end";
  showCalendarIcon?: boolean;
  calendarIcon?: React.ReactNode;

  // Calendar behavior
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  enableYearNavigation?: boolean;
  enableMonthNavigation?: boolean;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  // Popover behavior
  popoverAlign?: "start" | "center" | "end";
  popoverSide?: "top" | "right" | "bottom" | "left";
  popoverOffset?: number;

  // Input behavior
  allowTextInput?: boolean;
  clearable?: boolean;
  readOnly?: boolean;

  // Accessibility
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;

  // Events
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onCalendarOpen?: () => void;
  onCalendarClose?: () => void;
}

// Utility functions
function formatDate(
  date: Date | undefined,
  format: DateFormat = "full",
  customDateFormat?: Intl.DateTimeFormatOptions,
  locale: string = "en-US",
): string {
  if (!date) return "";

  if (format === "custom" && customDateFormat) {
    return date.toLocaleDateString(locale, customDateFormat);
  }

  const formats: Record<DateFormat, Intl.DateTimeFormatOptions> = {
    full: { day: "2-digit", month: "long", year: "numeric" },
    long: { day: "numeric", month: "long", year: "numeric" },
    medium: { day: "numeric", month: "short", year: "numeric" },
    short: { day: "2-digit", month: "short", year: "2-digit" },
    custom: customDateFormat || {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  };

  return date.toLocaleDateString(locale, formats[format]);
}

function formatDateRange(
  range: DateRange | undefined,
  format: DateFormat = "full",
  customFormat?: Intl.DateTimeFormatOptions,
  locale: string = "en-US",
): string {
  if (!range?.from) return "";

  const fromStr = formatDate(range.from, format, customFormat, locale);
  if (!range.to) return fromStr;

  const toStr = formatDate(range.to, format, customFormat, locale);
  return `${fromStr} - ${toStr}`;
}

function formatDateArray(
  dates: Date[] | undefined,
  format: DateFormat = "full",
  customFormat?: Intl.DateTimeFormatOptions,
  locale: string = "en-US",
): string {
  if (!dates || dates.length === 0) return "";

  return dates
    .map((date) => formatDate(date, format, customFormat, locale))
    .join(", ");
}

function isValidDate(date: Date | undefined): boolean {
  return !!(date && !isNaN(date.getTime()));
}

function parseDateString(
  dateString: string,
  format: DateFormat = "full",
  locale: string = "en-US",
): Date | null {
  if (!dateString.trim()) return null;

  // Try parsing with different strategies
  const strategies = [
    () => new Date(dateString),
    () => {
      const parsed = Date.parse(dateString);
      return isNaN(parsed) ? null : new Date(parsed);
    },
    () => {
      // Try locale-specific parsing
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formatter = new Intl.DateTimeFormat(locale, options);
      // This is a simplified approach - in production, you'd want more robust parsing
      return new Date(dateString);
    },
  ];

  for (const strategy of strategies) {
    try {
      const result = strategy();
      if (result && isValidDate(result)) {
        return result;
      }
    } catch {
      continue;
    }
  }

  return null;
}

export function DatePickerInput({
  // Core functionality
  value,
  defaultValue,
  onChange,
  mode = "single",

  // Display and formatting
  label,
  placeholder = "Select date",
  description,
  error,
  errorMessage,
  helperText,
  disabled = false,
  required = false,
  dateFormat = "full",
  customDateFormat,
  locale = "en-US",

  // Variants and styling
  variant = "default",
  size = "md",
  className,
  fieldClassName,
  inputClassName,
  calendarClassName,

  // Layout
  orientation = "vertical",
  addonPosition = "end",
  showCalendarIcon = true,
  calendarIcon,

  // Calendar behavior
  minDate,
  maxDate,
  disabledDates,
  enableYearNavigation = false,
  enableMonthNavigation = true,
  showOutsideDays = true,
  fixedWeeks = false,
  weekStartsOn = 0,

  // Popover behavior
  popoverAlign = "end",
  popoverSide = "bottom",
  popoverOffset = 10,

  // Input behavior
  allowTextInput = true,
  clearable = false,
  readOnly = false,

  // Accessibility
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,

  // Events
  onFocus,
  onBlur,
  onKeyDown,
  onCalendarOpen,
  onCalendarClose,
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<
    Date | Date[] | DateRange | undefined
  >(
    defaultValue ||
      (mode === "single" ? undefined : mode === "range" ? undefined : []),
  );
  const [month, setMonth] = React.useState<Date | undefined>(
    value
      ? Array.isArray(value)
        ? value[0]
        : value instanceof Date
          ? value
          : value.from
      : internalValue
        ? Array.isArray(internalValue)
          ? internalValue[0]
          : internalValue instanceof Date
            ? internalValue
            : internalValue?.from
        : new Date(),
  );

  // Determine if component is controlled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Format display value based on mode
  const getDisplayValue = React.useCallback(() => {
    if (mode === "single") {
      const date = currentValue as Date | undefined;
      return formatDate(date, dateFormat, customDateFormat, locale);
    } else if (mode === "range") {
      const range = currentValue as DateRange | undefined;
      return formatDateRange(range, dateFormat, customDateFormat, locale);
    } else if (mode === "multiple") {
      const dates = currentValue as Date[] | undefined;
      return formatDateArray(dates, dateFormat, customDateFormat, locale);
    }
    return "";
  }, [currentValue, mode, dateFormat, customDateFormat, locale]);

  const [inputValue, setInputValue] = React.useState(getDisplayValue());

  // Update input value when currentValue changes
  React.useEffect(() => {
    setInputValue(getDisplayValue());
  }, [getDisplayValue]);

  // Handle value change
  const handleValueChange = React.useCallback(
    (newValue: Date | Date[] | DateRange | undefined) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);

      // Update month for calendar navigation
      if (mode === "single" && newValue instanceof Date) {
        setMonth(newValue);
      } else if (
        mode === "range" &&
        newValue &&
        typeof newValue === "object" &&
        "from" in newValue
      ) {
        setMonth((newValue as { from?: Date }).from);
      } else if (
        mode === "multiple" &&
        Array.isArray(newValue) &&
        newValue.length > 0
      ) {
        setMonth(newValue[0]);
      }
    },
    [isControlled, onChange, mode],
  );

  // Handle calendar selection
  const handleCalendarSelect = React.useCallback(
    (selectedDate: Date | Date[] | DateRange | undefined) => {
      handleValueChange(selectedDate);
      if (mode === "single") {
        setOpen(false);
        onCalendarClose?.();
      }
    },
    [handleValueChange, mode, onCalendarClose],
  );

  // Handle text input change
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (!allowTextInput) return;

      if (mode === "single") {
        const parsedDate = parseDateString(newValue, dateFormat, locale);
        if (parsedDate && isValidDate(parsedDate)) {
          handleValueChange(parsedDate);
        }
      }
    },
    [allowTextInput, mode, dateFormat, locale, handleValueChange],
  );

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);

      if (readOnly || disabled) return;

      switch (e.key) {
        case "ArrowDown":
        case "Enter":
        case " ":
          e.preventDefault();
          setOpen(true);
          onCalendarOpen?.();
          break;
        case "Escape":
          setOpen(false);
          onCalendarClose?.();
          break;
        case "Backspace":
        case "Delete":
          if (clearable && e.currentTarget.value === "") {
            handleValueChange(
              mode === "single" ? undefined : mode === "range" ? undefined : [],
            );
          }
          break;
      }
    },
    [
      onKeyDown,
      readOnly,
      disabled,
      clearable,
      handleValueChange,
      mode,
      onCalendarOpen,
      onCalendarClose,
    ],
  );

  // Handle popover open/close
  const handlePopoverOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (isOpen) {
        onCalendarOpen?.();
      } else {
        onCalendarClose?.();
      }
    },
    [onCalendarOpen, onCalendarClose],
  );

  // Handle focus/blur
  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      // Reformat input on blur to ensure consistent display
      setInputValue(getDisplayValue());
    },
    [onBlur, getDisplayValue],
  );

  // Generate unique ID
  const fieldId = React.useId();
  const inputId = id || `date-input-${fieldId}`;

  // Determine if there's an error
  const hasError = !!error || !!errorMessage || !!ariaInvalid;

  // Size classes
  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-9 text-sm",
    lg: "h-10 text-base",
  };

  // Variant classes
  const variantClasses = {
    default: "",
    inline: "border-0 shadow-none bg-transparent",
    minimal:
      "border-0 border-b border-input rounded-none shadow-none bg-transparent px-0",
    compact: sizeClasses[size],
  };

  // Clear button for clearable variant
  const ClearButton =
    clearable && currentValue && !disabled && !readOnly ? (
      <InputGroupButton
        variant="ghost"
        size="icon-xs"
        onClick={() =>
          handleValueChange(
            mode === "single" ? undefined : mode === "range" ? undefined : [],
          )
        }
        aria-label="Clear date"
      >
        ×
      </InputGroupButton>
    ) : null;

  return (
    <Field
      className={cn("w-full", fieldClassName)}
      orientation={orientation}
      data-invalid={hasError}
    >
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

      <InputGroup className={cn(variantClasses[variant], className)}>
        {addonPosition === "start" && showCalendarIcon && (
          <InputGroupAddon align="inline-start">
            {clearable && (
              <InputGroupAddon align="inline-start">
                {ClearButton}
              </InputGroupAddon>
            )}
            <Popover
              open={open && !readOnly}
              onOpenChange={handlePopoverOpenChange}
            >
              <PopoverTrigger asChild>
                <InputGroupButton
                  variant="ghost"
                  size="icon-xs"
                  aria-label={ariaLabel || "Select date"}
                  disabled={disabled || readOnly}
                >
                  {calendarIcon || <CalendarIcon />}
                </InputGroupButton>
              </PopoverTrigger>
              <PopoverContent
                className={cn("w-auto overflow-hidden p-0", calendarClassName)}
                align={popoverAlign}
                side={popoverSide}
                sideOffset={popoverOffset}
                alignOffset={-8}
              >
                {mode === "single" && (
                  <Calendar
                    mode="single"
                    selected={currentValue as Date | undefined}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={handleCalendarSelect}
                    disabled={disabledDates}
                    fromDate={minDate}
                    toDate={maxDate}
                    showOutsideDays={showOutsideDays}
                    fixedWeeks={fixedWeeks}
                    weekStartsOn={weekStartsOn}
                    className={calendarClassName}
                  />
                )}
                {mode === "range" && (
                  <Calendar
                    mode="range"
                    selected={currentValue as DateRange | undefined}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={handleCalendarSelect}
                    numberOfMonths={2}
                    disabled={disabledDates}
                    fromDate={minDate}
                    toDate={maxDate}
                    showOutsideDays={showOutsideDays}
                    fixedWeeks={fixedWeeks}
                    weekStartsOn={weekStartsOn}
                    className={calendarClassName}
                    required={required}
                  />
                )}
                {mode === "multiple" && (
                  <Calendar
                    mode="multiple"
                    selected={currentValue as Date[] | undefined}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={handleCalendarSelect}
                    disabled={disabledDates}
                    fromDate={minDate}
                    toDate={maxDate}
                    showOutsideDays={showOutsideDays}
                    fixedWeeks={fixedWeeks}
                    weekStartsOn={weekStartsOn}
                    className={calendarClassName}
                  />
                )}
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        )}

        <InputGroupInput
          id={inputId}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly || !allowTextInput}
          required={required}
          aria-label={ariaLabel}
          aria-describedby={cn(
            ariaDescribedBy,
            description && `${inputId}-description`,
            hasError && `${inputId}-error`,
          )}
          aria-invalid={hasError}
          className={cn(
            variantClasses[variant],
            sizeClasses[size],
            inputClassName,
          )}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {addonPosition === "end" && (
          <InputGroupAddon align="inline-end">
            {clearable && (
              <InputGroupAddon align="inline-end">
                {ClearButton}
              </InputGroupAddon>
            )}
            {showCalendarIcon && (
              <Popover
                open={open && !readOnly}
                onOpenChange={handlePopoverOpenChange}
              >
                <PopoverTrigger asChild>
                  <InputGroupButton
                    variant="ghost"
                    size="icon-xs"
                    aria-label={ariaLabel || "Select date"}
                    disabled={disabled || readOnly}
                  >
                    {calendarIcon || <CalendarIcon />}
                  </InputGroupButton>
                </PopoverTrigger>
                <PopoverContent
                  className={cn(
                    "w-auto overflow-hidden p-0",
                    calendarClassName,
                  )}
                  align={popoverAlign}
                  side={popoverSide}
                  sideOffset={popoverOffset}
                  alignOffset={-8}
                >
                  {mode === "single" && (
                    <Calendar
                      mode="single"
                      selected={currentValue as Date | undefined}
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={handleCalendarSelect}
                      disabled={disabledDates}
                      fromDate={minDate}
                      toDate={maxDate}
                      showOutsideDays={showOutsideDays}
                      fixedWeeks={fixedWeeks}
                      weekStartsOn={weekStartsOn}
                      className={calendarClassName}
                    />
                  )}
                  {mode === "range" && (
                    <Calendar
                      mode="range"
                      selected={currentValue as DateRange | undefined}
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={handleCalendarSelect}
                      numberOfMonths={2}
                      disabled={disabledDates}
                      fromDate={minDate}
                      toDate={maxDate}
                      showOutsideDays={showOutsideDays}
                      fixedWeeks={fixedWeeks}
                      weekStartsOn={weekStartsOn}
                      className={calendarClassName}
                      required={required}
                    />
                  )}
                  {mode === "multiple" && (
                    <Calendar
                      mode="multiple"
                      selected={currentValue as Date[] | undefined}
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={handleCalendarSelect}
                      disabled={disabledDates}
                      fromDate={minDate}
                      toDate={maxDate}
                      showOutsideDays={showOutsideDays}
                      fixedWeeks={fixedWeeks}
                      weekStartsOn={weekStartsOn}
                      className={calendarClassName}
                    />
                  )}
                </PopoverContent>
              </Popover>
            )}
          </InputGroupAddon>
        )}
      </InputGroup>

      {description && (
        <FieldDescription id={`${inputId}-description`}>
          {description}
        </FieldDescription>
      )}

      {(errorMessage || helperText) && (
        <div className="text-xs mt-1">
          {errorMessage ? (
            <p className="text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errorMessage}
            </p>
          ) : helperText ? (
            <p className="text-muted-foreground">{helperText}</p>
          ) : null}
        </div>
      )}

      {error && (
        <FieldError
          id={`${inputId}-error`}
          errors={
            Array.isArray(error)
              ? error.map((message) => ({ message }))
              : [{ message: error }]
          }
        />
      )}
    </Field>
  );
}
