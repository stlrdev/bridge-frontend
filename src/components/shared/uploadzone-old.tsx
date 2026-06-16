"use client";

import React, { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";

export interface UploadFile {
  file: File;
  id: string;
  preview?: string;
  progress?: number;
  status?: "pending" | "uploading" | "success" | "error";
  error?: string;
}

export interface UploadZoneProps {
  onFilesChange?: (files: UploadFile[]) => void;
  onUpload?: (files: UploadFile[]) => Promise<void>;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  theme?: "light" | "dark" | "auto";
  showPreview?: boolean;
  showProgress?: boolean;
  dragText?: string;
  dropText?: string;
  browseText?: string;
  removeText?: string;
  errorText?: string;
  maxSizeErrorText?: string;
  fileTypeErrorText?: string;
  maxFilesErrorText?: string;
  children?: React.ReactNode;
}

export function UploadZone({
  onFilesChange,
  onUpload,
  accept = "image/*,.pdf,.doc,.docx,.txt",
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 10,
  disabled = false,
  className,
  theme = "auto",
  showPreview = true,
  showProgress = false,
  dragText = "Drag & drop your files here",
  dropText = "Drop files here",
  browseText = "or browse files",
  removeText = "Remove",
  errorText = "Something went wrong",
  maxSizeErrorText = "File size exceeds maximum limit",
  fileTypeErrorText = "File type not supported",
  maxFilesErrorText = "Maximum number of files exceeded",
  children,
  ...props
}: UploadZoneProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

      if (accept && accept !== "*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
        const fileType = file.type;

        const isAccepted = acceptedTypes.some((acceptedType) => {
          if (acceptedType.startsWith(".")) {
            return fileExtension === acceptedType.toLowerCase();
          }
          if (acceptedType.includes("/*")) {
            const mainType = acceptedType.split("/")[0];
            return fileType.startsWith(mainType + "/");
          }
          return fileType === acceptedType;
        });

        if (!isAccepted) {
          return fileTypeErrorText;
        }
      }

      return null;
    },
    [accept, maxSize, maxSizeErrorText, fileTypeErrorText],
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
        newFiles.push({
          file,
          id: generateId(),
          preview,
          status: "pending",
        });
      }

      if (files.length + newFiles.length > maxFiles) {
        errors.push(maxFilesErrorText);
      }

      if (errors.length > 0) {
        console.error(errors.join("\n"));
      }

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);

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
      validateFile,
      createPreview,
      onFilesChange,
      onUpload,
      maxFilesErrorText,
      errorText,
    ],
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;

      setIsDragActive(true);
      setIsDragReject(false);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

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
    },
    [files, onFilesChange],
  );

  const openFileDialog = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const themeClasses =
    theme === "auto"
      ? "bg-card border-border text-foreground hover:bg-accent/50"
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
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
          themeClasses,
          isDragActive && !isDragReject && activeThemeClasses,
          isDragReject && rejectThemeClasses,
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "hover:border-primary/50",
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
          accept={accept}
          multiple={multiple}
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
