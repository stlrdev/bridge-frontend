"use client";

import React, { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { cva, type VariantProps } from "class-variance-authority";

const uploadAreaVariants = cva(
  "border-2 border-dashed rounded-lg transition-all duration-200",
  {
    variants: {
      isDragOver: {
        true: "border-primary bg-primary/10",
        false: "border-border hover:border-primary/50",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      isDragOver: false,
      disabled: false,
    },
  },
);

export interface UploadFile {
  file: File;
  id: string;
  preview?: string;
  progress?: number;
  status?: "pending" | "uploading" | "success" | "error";
  error?: string;
}

export interface UploadZoneProps extends VariantProps<
  typeof uploadAreaVariants
> {
  // Mode
  mode?: "compact" | "area";

  // File handling
  onFilesChange?: (files: UploadFile[]) => void;
  onFileSelect?: (file: UploadFile) => void;
  onFileRemove?: (id: string) => void;
  onUpload?: (files: UploadFile[]) => Promise<void>;
  onError?: (error: string) => void;

  // File validation
  accept?: string;
  acceptedTypes?: string[]; // MIME types (alternative to accept)
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;

  // Theme & styling
  theme?: "light" | "dark" | "auto";
  className?: string;
  areaClassName?: string;
  buttonClassName?: string;

  // Features
  showPreview?: boolean;
  showProgress?: boolean;

  // Text customization
  dragText?: string;
  dropText?: string;
  browseText?: string;
  removeText?: string;
  buttonText?: string; // for compact mode
  areaText?: string; // for area mode
  areaDragText?: string; // for area mode

  // Error messages
  errorText?: string;
  maxSizeErrorText?: string;
  fileTypeErrorText?: string;
  maxFilesErrorText?: string;

  // State
  value?: UploadFile[];
  defaultValue?: UploadFile[];

  // Custom content
  children?: React.ReactNode;
}

export function UploadZone({
  mode = "area",
  onFilesChange,
  onFileSelect,
  onFileRemove,
  onUpload,
  onError,
  accept = "image/*,.pdf,.doc,.docx,.txt",
  acceptedTypes,
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 10,
  disabled = false,
  theme = "auto",
  className,
  areaClassName,
  buttonClassName,
  showPreview = true,
  showProgress = false,
  dragText = "Drag & drop your files here",
  dropText = "Drop files here",
  browseText = "or browse files",
  removeText = "Remove",
  buttonText = "Choose File",
  areaText = "Drop files here or click to browse",
  areaDragText = "Drop files here",
  errorText = "Something went wrong",
  maxSizeErrorText = "File size exceeds maximum limit",
  fileTypeErrorText = "File type not supported",
  maxFilesErrorText = "Maximum number of files exceeded",
  value,
  defaultValue = [],
  children,
  ...variants
}: UploadZoneProps) {
  const [files, setFiles] = useState<UploadFile[]>(value || defaultValue);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const createPreview = useCallback(
    (file: File): Promise<string | undefined> => {
      return new Promise((resolve) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => resolve(undefined);
          reader.readAsDataURL(file);
        } else {
          resolve(undefined);
        }
      });
    },
    [],
  );

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxSize) {
        return maxSizeErrorText;
      }

      // Use accept string or acceptedTypes array for validation
      const validationTypes =
        acceptedTypes || (accept ? accept.split(",").map((t) => t.trim()) : []);

      if (validationTypes.length > 0 && !validationTypes.includes("*/*")) {
        const isAccepted = validationTypes.some((acceptedType) => {
          if (acceptedType.startsWith(".")) {
            const fileExtension =
              "." + file.name.split(".").pop()?.toLowerCase();
            return fileExtension === acceptedType.toLowerCase();
          }
          if (acceptedType.includes("/*")) {
            const mainType = acceptedType.split("/")[0];
            return file.type.startsWith(mainType + "/");
          }
          return file.type === acceptedType;
        });

        if (!isAccepted) {
          return fileTypeErrorText;
        }
      }

      return null;
    },
    [accept, acceptedTypes, maxSize, maxSizeErrorText, fileTypeErrorText],
  );

  const processFiles = useCallback(
    async (fileList: FileList) => {
      if (disabled) return;

      const newFiles: UploadFile[] = [];
      const errors: string[] = [];

      for (
        let i = 0;
        i < fileList.length && files.length + newFiles.length < maxFiles;
        i++
      ) {
        const file = fileList[i];
        const validationError = validateFile(file);

        if (validationError) {
          errors.push(`${file.name}: ${validationError}`);
          continue;
        }

        const preview = await createPreview(file);
        const uploadFile: UploadFile = {
          file,
          id: generateId(),
          preview,
          status: "pending",
        };
        newFiles.push(uploadFile);
      }

      if (files.length + newFiles.length > maxFiles) {
        errors.push(maxFilesErrorText);
      }

      if (errors.length > 0) {
        onError?.(errors.join("\n"));
      }

      const updatedFiles =
        mode === "compact" ? newFiles : [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);

      newFiles.forEach((file) => {
        onFileSelect?.(file);
      });

      if (onUpload && newFiles.length > 0) {
        const uploadingFiles = newFiles.map((f) => ({
          ...f,
          status: "uploading" as const,
        }));
        try {
          setFiles((prev) =>
            prev.map(
              (f) =>
                uploadingFiles.find((uf: UploadFile) => uf.id === f.id) || f,
            ),
          );

          await onUpload(uploadingFiles);

          setFiles((prev) =>
            prev.map((f) =>
              uploadingFiles.find((uf: UploadFile) => uf.id === f.id)
                ? { ...f, status: "success" as const }
                : f,
            ),
          );
        } catch (error) {
          setFiles((prev) =>
            prev.map((f) =>
              uploadingFiles.find((uf: UploadFile) => uf.id === f.id)
                ? { ...f, status: "error" as const, error: errorText }
                : f,
            ),
          );
        }
      }
    },
    [
      disabled,
      files,
      maxFiles,
      mode,
      validateFile,
      createPreview,
      onFilesChange,
      onFileSelect,
      onUpload,
      maxFilesErrorText,
      onError,
      errorText,
    ],
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;

      dragCounter.current++;
      setIsDragActive(true);
      setIsDragReject(false);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragActive(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Set the proper drop effect
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      // Reset drag counter and state
      dragCounter.current = 0;
      setIsDragActive(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [disabled, processFiles],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        processFiles(selectedFiles);
      }
      e.target.value = "";
    },
    [processFiles],
  );

  const removeFile = useCallback(
    (id: string) => {
      const updatedFiles = files.filter((f) => f.id !== id);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
      onFileRemove?.(id);
    },
    [files, onFilesChange, onFileRemove],
  );

  const openFileDialog = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  // Get accept string for input
  const inputAccept = acceptedTypes ? acceptedTypes.join(",") : accept;

  // Compact mode
  if (mode === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button
          variant="outline"
          onClick={openFileDialog}
          disabled={disabled}
          className={buttonClassName}
        >
          {buttonText}
        </Button>

        <Input
          ref={inputRef}
          type="file"
          accept={inputAccept}
          multiple={multiple && maxFiles > 1}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />

        {files.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {files.map((uploadFile) => (
              <div
                key={uploadFile.id}
                className="flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded"
              >
                {showPreview && uploadFile.preview ? (
                  <img
                    src={uploadFile.preview}
                    alt={uploadFile.file.name}
                    className="w-4 h-4 object-cover rounded"
                  />
                ) : uploadFile.file.type.startsWith("image/") ? (
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <File className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="truncate max-w-[150px]">
                  {uploadFile.file.name}
                </span>
                {!disabled && (
                  <button
                    onClick={() => removeFile(uploadFile.id)}
                    className="text-muted-foreground hover:text-destructive ml-1"
                    title={removeText}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Area mode
  const themeClasses =
    theme === "auto"
      ? "bg-card text-foreground hover:bg-accent/50"
      : theme === "dark"
        ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50";

  const activeThemeClasses =
    theme === "auto"
      ? "bg-primary/10 border-primary text-primary"
      : theme === "dark"
        ? "bg-blue-900/30 border-blue-400 text-blue-300"
        : "bg-blue-50 border-blue-400 text-blue-600";

  const rejectThemeClasses =
    theme === "auto"
      ? "bg-destructive/10 border-destructive text-destructive"
      : theme === "dark"
        ? "bg-red-900/30 border-red-400 text-red-300"
        : "bg-red-50 border-red-400 text-red-600";

  return (
    <div
      className={cn("w-full", files.length > 0 ? "space-y-4" : "", className)}
    >
      <div
        className={cn(
          uploadAreaVariants({
            isDragOver: isDragActive && !isDragReject,
            disabled,
            ...variants,
          }),
          themeClasses,
          isDragActive && !isDragReject && activeThemeClasses,
          isDragReject && rejectThemeClasses,
          "p-8 text-center",
          areaClassName,
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={inputRef}
          type="file"
          accept={inputAccept}
          multiple={multiple && maxFiles > 1}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />

        {children || (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-muted">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isDragActive ? dropText : dragText}
              </p>
              <p className="text-sm text-muted-foreground">{browseText}</p>
              <p className="text-xs text-muted-foreground">
                Max file size: {(maxSize / 1024 / 1024).toFixed(1)}MB
                {maxFiles > 1 && ` • Max files: ${maxFiles}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">
            Files ({files.length})
          </div>
          <div className="grid gap-2">
            {files.map((uploadFile) => (
              <div
                key={uploadFile.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border bg-card",
                  uploadFile.status === "error" &&
                    "border-destructive bg-destructive/5",
                )}
              >
                {showPreview && uploadFile.preview ? (
                  <img
                    src={uploadFile.preview}
                    alt={uploadFile.file.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : uploadFile.file.type.startsWith("image/") ? (
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-muted">
                    <ImageIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-muted">
                    <File className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {uploadFile.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadFile.file.size / 1024).toFixed(1)} KB
                  </p>
                  {uploadFile.status === "error" && uploadFile.error && (
                    <p className="text-xs text-destructive mt-1">
                      {uploadFile.error}
                    </p>
                  )}
                </div>

                {showProgress && uploadFile.status === "uploading" && (
                  <div className="w-20">
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${uploadFile.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(uploadFile.id);
                  }}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title={removeText}
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
