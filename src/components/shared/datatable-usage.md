# DataTable Component

A highly customizable and feature-rich datatable component built with React and TypeScript. It includes pagination, sorting, searching, selection, and row actions.

## Features

- ✅ **Customizable columns** with custom rendering
- ✅ **Built-in pagination** using the existing pagination component
- ✅ **Sorting** on any column
- ✅ **Search functionality**
- ✅ **Row selection** (single and bulk)
- ✅ **Row actions** with custom buttons
- ✅ **Responsive design**
- ✅ **Loading and error states**
- ✅ **Custom styling options**
- ✅ **Export functionality**
- ✅ **TypeScript support**

## Basic Usage

```tsx
import { DataTable, Column } from '@/components/shared/datatable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    key: 'role',
    label: 'Role',
    sortable: true,
  },
];

function MyComponent() {
  const [data, setData] = React.useState<User[]>(users);

  return (
    <DataTable
      data={data}
      columns={columns}
    />
  );
}
```

## Advanced Usage

### With Pagination and Sorting

```tsx
const [currentPage, setCurrentPage] = React.useState(1);
const [pageSize, setPageSize] = React.useState(10);
const [sortKey, setSortKey] = React.useState('name');
const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

<DataTable
  data={paginatedData}
  columns={columns}
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
  sortKey={sortKey}
  sortDirection={sortDirection}
  onSort={setSortKey}
/>
```

### With Search and Actions

```tsx
const [searchQuery, setSearchQuery] = React.useState('');

<DataTable
  data={data}
  columns={columns}
  actions={{
    search: {
      placeholder: 'Search users...',
      onSearch: setSearchQuery,
      value: searchQuery,
    },
    refresh: {
      onRefresh: handleRefresh,
      loading: isLoading,
    },
    export: {
      onExport: handleExport,
      label: 'Export CSV',
    },
  }}
/>
```

### With Row Selection

```tsx
const [selectedRows, setSelectedRows] = React.useState<User[]>([]);

<DataTable
  data={data}
  columns={columns}
  selectable
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
  getRowId={(row) => row.id}
/>
```

### With Custom Cell Rendering

```tsx
const columns: Column<User>[] = [
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => {
      const colors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800',
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colors[value]}`}>
          {value}
        </span>
      );
    },
  },
];
```

### With Row Actions

```tsx
const rowActions = (row: User) => (
  <div className="flex items-center gap-1">
    <Button variant="ghost" size="icon-xs" onClick={() => viewUser(row)}>
      <Eye className="w-3 h-3" />
    </Button>
    <Button variant="ghost" size="icon-xs" onClick={() => editUser(row)}>
      <Edit className="w-3 h-3" />
    </Button>
    <Button variant="ghost" size="icon-xs" onClick={() => deleteUser(row)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  </div>
);

<DataTable
  data={data}
  columns={columns}
  rowActions={rowActions}
/>
```

## Props Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **Required** | Array of data to display |
| `columns` | `Column<T>[]` | **Required** | Column configuration |
| `loading` | `boolean` | `false` | Show loading state |
| `error` | `string` | `undefined` | Show error message |
| `empty` | `ReactNode` | `"No data available"` | Empty state message |
| `className` | `string` | `undefined` | Additional CSS classes |

### Pagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | `1` | Current page number |
| `totalPages` | `number` | `1` | Total number of pages |
| `onPageChange` | `(page: number) => void` | `undefined` | Page change handler |
| `pageSize` | `number` | `undefined` | Current page size |
| `onPageSizeChange` | `(size: number) => void` | `undefined` | Page size change handler |

### Sorting Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortKey` | `string` | `undefined` | Current sort column |
| `sortDirection` | `"asc" \| "desc"` | `undefined` | Current sort direction |
| `onSort` | `(key: string, direction: "asc" \| "desc") => void` | `undefined` | Sort change handler |

### Selection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectable` | `boolean` | `false` | Enable row selection |
| `selectedRows` | `T[]` | `[]` | Currently selected rows |
| `onSelectionChange` | `(rows: T[]) => void` | `undefined` | Selection change handler |
| `getRowId` | `(row: T, index: number) => string \| number` | `(row, index) => index` | Get unique row ID |

### Actions Props

| Prop | Type | Description |
|------|------|-------------|
| `actions.search` | `{ placeholder?: string; onSearch: (query: string) => void; value?: string }` | Search configuration |
| `actions.refresh` | `{ onRefresh: () => void; loading?: boolean }` | Refresh button configuration |
| `actions.export` | `{ onExport: () => void; label?: string }` | Export button configuration |
| `actions.custom` | `ReactNode` | Custom action buttons |

### Row Actions

| Prop | Type | Description |
|------|------|-------------|
| `rowActions` | `(row: T, index: number) => ReactNode` | Render row action buttons |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | `true` | Show striped rows |
| `hoverable` | `boolean` | `true` | Show hover effect |
| `compact` | `boolean` | `false` | Use compact spacing |
| `bordered` | `boolean` | `true` | Show table borders |

### Custom Rendering

| Prop | Type | Description |
|------|------|-------------|
| `header` | `ReactNode` | Custom header content |
| `footer` | `ReactNode` | Custom footer content |

## Column Configuration

```tsx
interface Column<T = any> {
  key: string;                    // Data key
  label: string;                  // Header label
  sortable?: boolean;             // Enable sorting
  render?: (value: any, row: T, index: number) => React.ReactNode; // Custom renderer
  className?: string;             // Cell CSS classes
  headerClassName?: string;       // Header CSS classes
  width?: string | number;        // Column width
  minWidth?: string | number;      // Minimum column width
}
```

## Examples

See `datatable-demo.tsx` for a complete working example with all features enabled.
