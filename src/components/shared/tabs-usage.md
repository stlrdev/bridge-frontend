# Tabs Component Usage

A comprehensive and customizable tabs system built on top of Radix UI with multiple variants, sizes, and animations.

## Import

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/shared/tabs";
```

## Basic Usage

```tsx
<Tabs defaultValue="tab1" className="w-full">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <div>Content for Tab 1</div>
  </TabsContent>
  <TabsContent value="tab2">
    <div>Content for Tab 2</div>
  </TabsContent>
  <TabsContent value="tab3">
    <div>Content for Tab 3</div>
  </TabsContent>
</Tabs>
```

## Variants

### Default Variant
The standard tabs with a subtle background and rounded corners.

```tsx
<Tabs defaultValue="overview" className="w-full">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="analytics">...</TabsContent>
</Tabs>
```

### Card Variant
Tabs styled as cards with a contained appearance.

```tsx
<Tabs variant="card" defaultValue="profile" className="w-full">
  <TabsList variant="card">
    <TabsTrigger variant="card" value="profile">Profile</TabsTrigger>
    <TabsTrigger variant="card" value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent variant="card" value="profile">...</TabsContent>
  <TabsContent variant="card" value="security">...</TabsContent>
</Tabs>
```

### Underline Variant
Minimal tabs with an underline indicator for the active tab.

```tsx
<Tabs variant="underline" defaultValue="dashboard" className="w-full">
  <TabsList variant="underline">
    <TabsTrigger variant="underline" value="dashboard">Dashboard</TabsTrigger>
    <TabsTrigger variant="underline" value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent variant="underline" value="dashboard">...</TabsContent>
  <TabsContent variant="underline" value="settings">...</TabsContent>
</Tabs>
```

### Pills Variant
Pill-shaped tabs with a modern, clean appearance.

```tsx
<Tabs variant="pills" defaultValue="all" className="w-full">
  <TabsList variant="pills">
    <TabsTrigger variant="pills" value="all">All Items</TabsTrigger>
    <TabsTrigger variant="pills" value="active">Active</TabsTrigger>
  </TabsList>
  <TabsContent variant="pills" value="all">...</TabsContent>
  <TabsContent variant="pills" value="active">...</TabsContent>
</Tabs>
```

## Sizes

### Small Size
Compact tabs for tight spaces.

```tsx
<Tabs size="sm" defaultValue="tab1">
  <TabsList size="sm">
    <TabsTrigger size="sm" value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger size="sm" value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">...</TabsContent>
</Tabs>
```

### Large Size
Larger tabs with more padding and bigger text.

```tsx
<Tabs size="lg" defaultValue="tab1">
  <TabsList size="lg">
    <TabsTrigger size="lg" value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger size="lg" value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">...</TabsContent>
</Tabs>
```

## Advanced Features

### Icons
Add icons to tabs for better visual hierarchy.

```tsx
import { User, Settings, Bell } from "lucide-react";

<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile" leftIcon={<User className="size-4" />}>
      Profile
    </TabsTrigger>
    <TabsTrigger value="notifications" leftIcon={<Bell className="size-4" />}>
      Notifications
    </TabsTrigger>
    <TabsTrigger value="settings" leftIcon={<Settings className="size-4" />}>
      Settings
    </TabsTrigger>
  </TabsList>
  <TabsContent value="profile">...</TabsContent>
  <TabsContent value="notifications">...</TabsContent>
  <TabsContent value="settings">...</TabsContent>
</Tabs>
```

### Badges
Add badges to show counts or status indicators.

```tsx
<Tabs defaultValue="inbox">
  <TabsList>
    <TabsTrigger value="inbox" badge="5">
      Inbox
    </TabsTrigger>
    <TabsTrigger value="sent" badge="12">
      Sent
    </TabsTrigger>
    <TabsTrigger value="archive">
      Archive
    </TabsTrigger>
  </TabsList>
  <TabsContent value="inbox">...</TabsContent>
  <TabsContent value="sent">...</TabsContent>
  <TabsContent value="archive">...</TabsContent>
</Tabs>
```

### Controlled Tabs
Control the active tab programmatically.

```tsx
const [activeTab, setActiveTab] = useState("dashboard");

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="dashboard">...</TabsContent>
  <TabsContent value="analytics">...</TabsContent>
  <TabsContent value="reports">...</TabsContent>
</Tabs>

// Programmatically change tabs
<button onClick={() => setActiveTab("analytics")}>
  Go to Analytics
</button>
```

### Animations
Add smooth transitions between tab content.

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" animation="fade">
    Fade animation content
  </TabsContent>
  <TabsContent value="tab2" animation="slide">
    Slide animation content
  </TabsContent>
</Tabs>
```

Available animations:
- `none` (default)
- `fade`
- `slide`
- `scale`

### Vertical Orientation
Arrange tabs vertically instead of horizontally.

```tsx
<Tabs orientation="vertical" defaultValue="tab1" className="flex">
  <TabsList orientation="vertical" className="w-48">
    <TabsTrigger orientation="vertical" value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger orientation="vertical" value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" className="flex-1">...</TabsContent>
  <TabsContent value="tab2" className="flex-1">...</TabsContent>
</Tabs>
```

## Props Reference

### Tabs Props
- `variant?: "default" | "card" | "underline" | "pills"` - Visual style variant
- `size?: "default" | "sm" | "lg"` - Size of the tabs
- `orientation?: "horizontal" | "vertical"` - Layout orientation

### TabsList Props
- `variant?: "default" | "card" | "underline" | "pills"` - Visual style variant
- `size?: "default" | "sm" | "lg"` - Size of the tabs
- `orientation?: "horizontal" | "vertical"` - Layout orientation

### TabsTrigger Props
- `variant?: "default" | "card" | "underline" | "pills"` - Visual style variant
- `size?: "default" | "sm" | "lg"` - Size of the tab
- `orientation?: "horizontal" | "vertical"` - Layout orientation
- `leftIcon?: React.ReactNode` - Icon to display on the left
- `rightIcon?: React.ReactNode` - Icon to display on the right
- `badge?: string | number` - Badge content to display

### TabsContent Props
- `variant?: "default" | "card" | "underline" | "pills"` - Visual style variant
- `animation?: "none" | "fade" | "slide" | "scale"` - Content transition animation

## Accessibility

The tabs component is built on top of Radix UI's tabs primitive and includes:

- Proper ARIA attributes
- Keyboard navigation (Arrow keys, Tab, Enter, Space)
- Screen reader support
- Focus management

## Styling

The component uses Tailwind CSS with class-variance-authority for variant management. You can customize the appearance by:

1. Modifying the variant classes in the component file
2. Using the `className` prop for additional styling
3. Overriding CSS variables in your global styles

## Examples

See `tabs-demo.tsx` for comprehensive examples of all variants and features.
