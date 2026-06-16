"use client";

import { useState } from "react";
import { UploadFile } from "./upload-file";

export function UploadFileDemo() {
  const [compactFiles, setCompactFiles] = useState<File[]>([]);
  const [areaFiles, setAreaFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Upload File Component Demo</h2>
        
        {/* Compact Mode */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Compact Mode</h3>
          <p className="text-sm text-gray-600">
            Single file upload with button and filename display
          </p>
          <UploadFile
            mode="compact"
            maxFiles={1}
            maxFileSize={5 * 1024 * 1024} // 5MB
            onFilesChange={setCompactFiles}
            onError={(error) => console.error("Compact error:", error)}
            buttonText="Select Document"
          />
          <div className="text-xs text-gray-500">
            Files: {compactFiles.length} | Max size: 5MB
          </div>
        </div>

        {/* Area Mode */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Area Mode</h3>
          <p className="text-sm text-gray-600">
            Drag and drop area with multiple file support
          </p>
          <UploadFile
            mode="area"
            maxFiles={5}
            maxFileSize={10 * 1024 * 1024} // 10MB
            onFilesChange={setAreaFiles}
            onError={(error) => console.error("Area error:", error)}
            areaText="Drag files here or click to browse"
            areaDragText="Release to upload files"
          />
          <div className="text-xs text-gray-500">
            Files: {areaFiles.length}/5 | Max size: 10MB per file
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Image Upload (Area Mode)</h3>
          <p className="text-sm text-gray-600">
            Only accepts image files with 2MB limit
          </p>
          <UploadFile
            mode="area"
            maxFiles={3}
            maxFileSize={2 * 1024 * 1024} // 2MB
            acceptedTypes={["image/jpeg", "image/png", "image/gif", "image/webp"]}
            onFilesChange={setImageFiles}
            onError={(error) => console.error("Image error:", error)}
            areaText="Drop images here or click to browse"
            buttonText="Choose Images"
          />
          <div className="text-xs text-gray-500">
            Files: {imageFiles.length}/3 | Max size: 2MB | Images only
          </div>
        </div>

        {/* Disabled State */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Disabled State</h3>
          <p className="text-sm text-gray-600">
            Component in disabled state
          </p>
          <UploadFile
            mode="compact"
            disabled={true}
            buttonText="Disabled Upload"
          />
        </div>
      </div>

      {/* File Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Files</h3>
        
        {compactFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Compact Files:</h4>
            {compactFiles.map((file, index) => (
              <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            ))}
          </div>
        )}

        {areaFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Area Files:</h4>
            {areaFiles.map((file, index) => (
              <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            ))}
          </div>
        )}

        {imageFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Image Files:</h4>
            {imageFiles.map((file, index) => (
              <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB) - {file.type}
              </div>
            ))}
          </div>
        )}

        {compactFiles.length === 0 && areaFiles.length === 0 && imageFiles.length === 0 && (
          <p className="text-sm text-gray-500">No files uploaded yet</p>
        )}
      </div>
    </div>
  );
}
