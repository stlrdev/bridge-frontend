# UploadZone Component

A highly customizable drag and drop file upload component with built-in theme support, progress tracking, and file validation.

## Features

- **Drag & Drop Support**: Intuitive file upload with drag and drop functionality
- **Theme Support**: Light, dark, and auto themes that adapt to your design system
- **File Validation**: Built-in validation for file size, type, and count
- **Progress Tracking**: Visual progress indicators for upload status
- **Image Previews**: Automatic thumbnail generation for image files
- **Customizable UI**: Fully customizable appearance and text
- **TypeScript Support**: Full TypeScript support with comprehensive interfaces

## Basic Usage

```tsx
import { UploadZone } from "@/components/shared/uploadzone";

function MyComponent() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  return (
    <UploadZone
      onFilesChange={setFiles}
      accept="image/*,.pdf,.doc,.docx"
      maxSize={10 * 1024 * 1024} // 10MB
      maxFiles={5}
    />
  );
}
```

## Compact Mode

For a more minimal interface, use compact mode:

```tsx
function CompactExample() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  return (
    <UploadZone
      mode="compact"
      onFilesChange={setFiles}
      buttonText="Choose Files"
      multiple={true}
      maxFiles={3}
      showPreview={true}
    />
  );
}
```

## Props

### Core Props

| Prop            | Type                                     | Default                          | Description                |
| --------------- | ---------------------------------------- | -------------------------------- | -------------------------- |
| `mode`          | `'compact' \| 'area'`                    | `'area'`                         | Display mode               |
| `onFilesChange` | `(files: UploadFile[]) => void`          | -                                | Callback when files change |
| `onUpload`      | `(files: UploadFile[]) => Promise<void>` | -                                | Async upload handler       |
| `accept`        | `string`                                 | `'image/*,.pdf,.doc,.docx,.txt'` | Accepted file types        |
| `multiple`      | `boolean`                                | `true`                           | Allow multiple files       |
| `maxSize`       | `number`                                 | `10485760` (10MB)                | Maximum file size in bytes |
| `maxFiles`      | `number`                                 | `10`                             | Maximum number of files    |
| `disabled`      | `boolean`                                | `false`                          | Disable the upload zone    |

### Theme & Appearance

| Prop           | Type                          | Default  | Description            |
| -------------- | ----------------------------- | -------- | ---------------------- |
| `theme`        | `'light' \| 'dark' \| 'auto'` | `'auto'` | Color theme            |
| `className`    | `string`                      | -        | Additional CSS classes |
| `showPreview`  | `boolean`                     | `true`   | Show image previews    |
| `showProgress` | `boolean`                     | `false`  | Show upload progress   |

### Customization

| Prop         | Type              | Default                         | Description                          |
| ------------ | ----------------- | ------------------------------- | ------------------------------------ |
| `dragText`   | `string`          | `'Drag & drop your files here'` | Drag zone text                       |
| `dropText`   | `string`          | `'Drop files here'`             | Drop zone text                       |
| `browseText` | `string`          | `'or browse files'`             | Browse button text                   |
| `removeText` | `string`          | `'Remove'`                      | Remove button text                   |
| `children`   | `React.ReactNode` | -                               | Custom content instead of default UI |

### Error Messages

| Prop                | Type     | Default                              | Description           |
| ------------------- | -------- | ------------------------------------ | --------------------- |
| `errorText`         | `string` | `'Something went wrong'`             | Generic error message |
| `maxSizeErrorText`  | `string` | `'File size exceeds maximum limit'`  | Size error message    |
| `fileTypeErrorText` | `string` | `'File type not supported'`          | Type error message    |
| `maxFilesErrorText` | `string` | `'Maximum number of files exceeded'` | Count error message   |

## Advanced Usage

### With Upload Handler

```tsx
const handleUpload = async (files: UploadFile[]) => {
  for (const file of files) {
    try {
      // Update progress
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, progress: 50 } : f)),
      );

      // Upload to server
      const formData = new FormData();
      formData.append("file", file.file);

      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      // Mark as complete
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: "success" } : f)),
      );
    } catch (error) {
      // Handle error
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: "error",
                error: "Upload failed",
              }
            : f,
        ),
      );
    }
  }
};
```

### Custom Content

```tsx
<UploadZone accept="image/*" onFilesChange={setFiles}>
  <div className="text-center py-12">
    <div className="text-6xl mb-4">📸</div>
    <h3 className="text-xl font-semibold mb-2">Upload Images</h3>
    <p className="text-muted-foreground">
      Drag and drop or click to select images
    </p>
  </div>
</UploadZone>
```

### Theme Variants

```tsx
// Auto theme (adapts to system)
<UploadZone theme="auto" />

// Light theme
<UploadZone theme="light" />

// Dark theme
<UploadZone theme="dark" />
```

## Types

### UploadFile Interface

```tsx
interface UploadFile {
  file: File;
  id: string;
  preview?: string;
  progress?: number;
  status?: "pending" | "uploading" | "success" | "error";
  error?: string;
}
```

## File Type Examples

```tsx
// Images only
accept = "image/*";

// Specific image types
accept = ".jpg,.jpeg,.png,.gif,.webp";

// Documents only
accept = ".pdf,.doc,.docx,.txt";

// All files
accept = "*";
```

## Styling

The component uses Tailwind CSS classes and respects your theme configuration. You can override styles using the `className` prop:

```tsx
<UploadZone
  className="border-4 border-dashed border-blue-500 bg-blue-50"
  theme="light"
/>
```

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- Proper ARIA labels
- Focus management
- High contrast support

## Browser Support

- Modern browsers with File API support
- Drag and drop API support
- FileReader API for image previews
