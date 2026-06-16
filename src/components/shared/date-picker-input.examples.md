# DatePickerInput Component Documentation

## Overview

The `DatePickerInput` component is a highly customizable and reusable date picker that supports single date, date range, and multiple date selection modes. It's built on top of the existing UI components and provides extensive customization options for styling, behavior, and accessibility.

## Features

- **Multiple Selection Modes**: Single date, date range, and multiple dates
- **Highly Customizable**: Extensive props for styling, behavior, and layout
- **Controlled/Uncontrolled**: Can be used as either controlled or uncontrolled component
- **Internationalization**: Support for different locales and date formats
- **Accessibility**: Full ARIA support and keyboard navigation
- **Validation**: Built-in support for min/max dates and disabled dates
- **Multiple Variants**: Default, inline, minimal, and compact styles
- **Flexible Layout**: Horizontal, vertical, or responsive orientations

## Props

### Core Functionality

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| Date[] \| DateRange \| undefined` | - | Controlled value of the date picker |
| `defaultValue` | `Date \| Date[] \| DateRange \| undefined` | - | Default value for uncontrolled mode |
| `onChange` | `(value: Date \| Date[] \| DateRange \| undefined) => void` | - | Callback when value changes |
| `mode` | `"single" \| "range" \| "multiple"` | `"single"` | Selection mode |

### Display and Formatting

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label |
| `placeholder` | `string` | `"Select date"` | Input placeholder text |
| `description` | `string` | - | Helper text description |
| `error` | `string \| string[]` | - | Error message(s) |
| `disabled` | `boolean` | `false` | Disable the input |
| `required` | `boolean` | `false` | Mark as required field |
| `dateFormat` | `"full" \| "long" \| "medium" \| "short" \| "custom"` | `"full"` | Date display format |
| `customDateFormat` | `Intl.DateTimeFormatOptions` | - | Custom date format options |
| `locale` | `string` | `"en-US"` | Locale for date formatting |

### Variants and Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "inline" \| "minimal" \| "compact"` | `"default"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Component size |
| `className` | `string` | - | Additional CSS classes |
| `fieldClassName` | `string` | - | Field container classes |
| `inputClassName` | `string` | - | Input element classes |
| `calendarClassName` | `string` | - | Calendar container classes |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` | Field layout orientation |
| `addonPosition` | `"start" \| "end"` | `"end"` | Calendar icon position |
| `showCalendarIcon` | `boolean` | `true` | Show calendar icon button |
| `calendarIcon` | `React.ReactNode` | - | Custom calendar icon |

### Calendar Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `disabledDates` | `Date[]` | - | Array of disabled dates |
| `showOutsideDays` | `boolean` | `true` | Show days from other months |
| `fixedWeeks` | `boolean` | `false` | Always show 6 weeks |
| `weekStartsOn` | `0-6` | `0` | Day week starts on (0=Sunday) |

### Input Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowTextInput` | `boolean` | `true` | Allow manual text input |
| `clearable` | `boolean` | `false` | Show clear button |
| `readOnly` | `boolean` | `false` | Make input read-only |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Custom input ID |
| `aria-label` | `string` | - | ARIA label |
| `aria-describedby` | `string` | - | ARIA describedby |
| `aria-invalid` | `boolean` | - | ARIA invalid state |

### Events

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFocus` | `(event: FocusEvent) => void` | - | Focus event handler |
| `onBlur` | `(event: FocusEvent) => void` | - | Blur event handler |
| `onKeyDown` | `(event: KeyboardEvent) => void` | - | Key down event handler |
| `onCalendarOpen` | `() => void` | - | Calendar open callback |
| `onCalendarClose` | `() => void` | - | Calendar close callback |

## Usage Examples

### Basic Single Date Selection

```tsx
import { DatePickerInput } from "@/components/shared/date-picker-input";

function BasicExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <DatePickerInput
      value={date}
      onChange={setDate}
      label="Select a date"
      placeholder="Choose a date"
    />
  );
}
```

### Date Range Selection

```tsx
function RangeExample() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7))
  });
  
  return (
    <DatePickerInput
      value={range}
      onChange={setRange}
      mode="range"
      label="Select date range"
      placeholder="Select start and end dates"
      description="Choose a start and end date for your booking"
    />
  );
}
```

### Multiple Date Selection

```tsx
function MultipleExample() {
  const [dates, setDates] = React.useState<Date[]>([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1)),
    new Date(new Date().setDate(new Date().getDate() + 7))
  ]);
  
  return (
    <DatePickerInput
      value={dates}
      onChange={setDates}
      mode="multiple"
      label="Select multiple dates"
      placeholder="Choose available dates"
    />
  );
}
```

### Custom Styling and Variants

```tsx
function StyledExample() {
  const [date, setDate] = React.useState<Date | undefined>();
  
  return (
    <div className="space-y-4">
      {/* Compact variant */}
      <DatePickerInput
        value={date}
        onChange={setDate}
        variant="compact"
        size="sm"
        label="Compact date picker"
        className="w-48"
      />
      
      {/* Minimal variant */}
      <DatePickerInput
        value={date}
        onChange={setDate}
        variant="minimal"
        label="Minimal date picker"
        placeholder="No border, just underline"
      />
      
      {/* Custom calendar icon */}
      <DatePickerInput
        value={date}
        onChange={setDate}
        calendarIcon={<span className="text-lg">{'\ud83d\udcc5'}</span>}
        label="Custom icon"
      />
    </div>
  );
}
```

### Advanced Configuration

```tsx
function AdvancedExample() {
  const [date, setDate] = React.useState<Date | undefined>();
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  
  return (
    <DatePickerInput
      value={date}
      onChange={setDate}
      label="Advanced date picker"
      description="Select a date within the next month"
      minDate={today}
      maxDate={nextMonth}
      disabledDates={[
        new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // Disable day after tomorrow
        new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // Disable 5 days from now
      ]}
      dateFormat="medium"
      locale="en-GB"
      clearable
      allowTextInput={false}
      addonPosition="start"
      orientation="horizontal"
      error={date ? undefined : "Please select a date"}
      required
    />
  );
}
```

### Internationalization

```tsx
function InternationalExample() {
  const [date, setDate] = React.useState<Date | undefined>();
  
  return (
    <div className="space-y-4">
      {/* French format */}
      <DatePickerInput
        value={date}
        onChange={setDate}
        label="Date en français"
        locale="fr-FR"
        dateFormat="long"
      />
      
      {/* Japanese format */}
      <DatePickerInput
        value={date}
        onChange={setDate}
        label=" Japanese date"
        locale="ja-JP"
        dateFormat="long"
      />
      
      {/* Custom format */}
      <DatePickerInput
        value={date}
        onChange={setDate}
        label="Custom format"
        dateFormat="custom"
        customDateFormat={{
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short'
        }}
      />
    </div>
  );
}
```

### Form Integration

```tsx
function FormExample() {
  const [formData, setFormData] = React.useState({
    birthDate: undefined as Date | undefined,
    appointmentRange: undefined as DateRange | undefined,
    preferredDates: [] as Date[]
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DatePickerInput
        value={formData.birthDate}
        onChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
        label="Date of Birth"
        required
        maxDate={new Date()}
        error={formData.birthDate ? undefined : "Date of birth is required"}
      />
      
      <DatePickerInput
        value={formData.appointmentRange}
        onChange={(range) => setFormData(prev => ({ ...prev, appointmentRange: range }))}
        mode="range"
        label="Appointment Period"
        minDate={new Date()}
        description="Select your preferred appointment period"
      />
      
      <DatePickerInput
        value={formData.preferredDates}
        onChange={(dates) => setFormData(prev => ({ ...prev, preferredDates: dates || [] }))}
        mode="multiple"
        label="Preferred Dates"
        description="Select all dates that work for you"
      />
      
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
```

## Keyboard Navigation

The component supports full keyboard navigation:

- **ArrowDown/Enter/Space**: Open the calendar
- **Escape**: Close the calendar
- **Arrow Keys**: Navigate calendar days
- **Enter**: Select focused date
- **Backspace/Delete**: Clear value (if clearable)

## Accessibility Features

- Full ARIA support with proper labels and descriptions
- Keyboard navigation for all interactions
- Focus management
- Screen reader compatibility
- High contrast mode support

## Best Practices

1. **Always provide labels** for accessibility
2. **Use appropriate modes** (single for most cases, range for periods, multiple for collections)
3. **Set min/max dates** when applicable to guide user selection
4. **Provide clear descriptions** for complex date requirements
5. **Use controlled mode** in forms for better state management
6. **Consider locale** for international applications
7. **Handle validation** appropriately with error states

## Migration from Original Component

The enhanced component is backward compatible with the original basic usage:

```tsx
// Original usage still works
<DatePickerInput />

// But now you can also do this:
<DatePickerInput
  value={selectedDate}
  onChange={setSelectedDate}
  label="Event Date"
  mode="single"
  variant="default"
  size="md"
  dateFormat="full"
  minDate={new Date()}
  required
/>
```

The enhanced version maintains the same basic API while adding extensive customization options for more advanced use cases.
