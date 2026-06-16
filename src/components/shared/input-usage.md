# Enhanced Input Component Usage

## Overview

The enhanced Input component provides extensive customization options with multiple variants, sizes, states, and support for left/right elements with event handlers.

## Features

- **9 Variants**: default, filled, outlined, underlined, ghost, success, warning, error, glass
- **6 Sizes**: xs, sm, default, lg, xl, 2xl
- **5 States**: default, success, warning, error, disabled
- **6 Radius Options**: none, sm, md, lg, xl, full
- **Left/Right Elements**: Support for React.ReactNode with custom styling
- **Loading States**: Built-in loading spinner with custom element support
- **Full TypeScript Support**: Complete type safety with IntelliSense

## Basic Usage

```tsx
import { Input } from "@/components/shared/input";

// Basic input
<Input placeholder="Enter text..." />

// With variant
<Input variant="filled" placeholder="Filled input" />

// With size
<Input size="lg" placeholder="Large input" />

// With state
<Input state="error" placeholder="Error state" />
```

## Left/Right Elements

```tsx
import { Search, Eye, EyeOff } from "lucide-react";

// Left element (icon)
<Input
  leftElement={<Search className="h-4 w-4" />}
  placeholder="Search..."
/>

// Right element (button)
<Input
  type={showPassword ? "text" : "password"}
  placeholder="Password"
  rightElement={
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  }
/>

// Both elements
<Input
  leftElement={<Search className="h-4 w-4" />}
  rightElement={<button>Search</button>}
  placeholder="Search with button"
/>
```

## Custom Styling

```tsx
// Custom element styling
<Input
  leftElement={<Search className="h-4 w-4" />}
  leftElementClassName="bg-blue-100 text-blue-600"
  rightElement={<button className="text-blue-600">Search</button>}
  rightElementClassName="bg-blue-50 hover:bg-blue-100"
  containerClassName="border-2 border-blue-200"
  placeholder="Custom styled"
/>

// Custom radius
<Input radius="full" placeholder="Fully rounded" />
```

## Loading States

```tsx
const [loading, setLoading] = useState(false);

<Input
  loading={loading}
  loadingElement={<CustomSpinner />}
  placeholder="Loading input"
/>

// Or use default spinner
<Input loading placeholder="Loading..." />
```

## State Management

```tsx
// Success state
<Input
  state="success"
  placeholder="Success!"
  rightElement={<CheckCircle className="h-4 w-4 text-green-500" />}
/>

// Error state
<Input
  state="error"
  placeholder="Error occurred"
  rightElement={<AlertCircle className="h-4 w-4 text-red-500" />}
/>

// Warning state
<Input
  state="warning"
  placeholder="Warning"
  rightElement={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
/>
```

## All Props

```tsx
interface InputProps {
  // Variants
  variant?: "default" | "filled" | "outlined" | "underlined" | "ghost" | "success" | "warning" | "error" | "glass";
  
  // Sizes
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl";
  
  // States
  state?: "default" | "success" | "warning" | "error" | "disabled";
  
  // Border radius
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  
  // Elements
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  leftElementClassName?: string;
  rightElementClassName?: string;
  containerClassName?: string;
  
  // State helpers
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  loading?: boolean;
  loadingElement?: React.ReactNode;
  
  // Standard input props
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  // ... all other HTML input attributes
}
```

## Examples

### Search Input with Loading
```tsx
const [searching, setSearching] = useState(false);

<Input
  leftElement={<Search className="h-4 w-4" />}
  rightElement={
    <button onClick={() => setSearching(!searching)}>
      {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
    </button>
  }
  loading={searching}
  placeholder="Search..."
/>
```

### Password Field with Toggle
```tsx
const [showPassword, setShowPassword] = useState(false);

<Input
  type={showPassword ? "text" : "password"}
  leftElement={<Lock className="h-4 w-4" />}
  rightElement={
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  }
  placeholder="Enter password"
/>
```

### Form Field with Validation
```tsx
const [email, setEmail] = useState("");
const [error, setError] = useState("");

<Input
  type="email"
  leftElement={<Mail className="h-4 w-4" />}
  state={error ? "error" : email ? "success" : "default"}
  placeholder="Enter email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setError("");
  }}
  rightElement={
    error ? <AlertCircle className="h-4 w-4 text-red-500" /> :
    email ? <CheckCircle className="h-4 w-4 text-green-500" /> : null
  }
/>
```

## Styling Notes

- The component uses Tailwind CSS classes and `class-variance-authority` for variant management
- All variants are responsive with `md:text-sm` for smaller screens
- Dark mode support is built-in with appropriate dark: prefixes
- Focus states use consistent ring colors and borders
- The component automatically adjusts padding when left/right elements are present

## Accessibility

- All standard input accessibility features are preserved
- Focus management works correctly with left/right elements
- ARIA attributes are passed through to the underlying input element
- Loading states properly disable the input
