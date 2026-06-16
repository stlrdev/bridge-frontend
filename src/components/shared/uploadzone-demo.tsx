"use client";

import React, { useState } from "react";
import { UploadZone, UploadFile } from "./uploadzone";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function UploadZoneDemo() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");

  const handleUpload = async (files: UploadFile[]) => {
    // Simulate upload progress
    for (const file of files) {
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress } : f)),
        );
      }
    }
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">UploadZone Component Demo</h1>
        <p className="text-muted-foreground">
          A customizable drag and drop file upload component with theme support.
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium">Theme:</span>
        <Button
          variant={theme === "auto" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("auto")}
        >
          Auto
        </Button>
        <Button
          variant={theme === "light" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("light")}
        >
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("dark")}
        >
          Dark
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic UploadZone</CardTitle>
          <CardDescription>
            Default configuration with image previews and progress tracking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadZone
            theme={theme}
            onFilesChange={setFiles}
            onUpload={handleUpload}
            showPreview={true}
            showProgress={true}
            accept="image/*,.pdf,.doc,.docx"
            maxSize={5 * 1024 * 1024} // 5MB
            maxFiles={5}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>UploadZone with Custom Content</CardTitle>
          <CardDescription>
            Using custom children instead of default drag and drop UI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadZone
            theme={theme}
            onFilesChange={setFiles}
            accept=".jpg,.jpeg,.png,.gif"
            maxSize={2 * 1024 * 1024} // 2MB
            maxFiles={3}
          >
            <div className="space-y-4 py-8">
              <div className="text-4xl">📸</div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Upload Images Only</p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG, GIF files up to 2MB each
                </p>
              </div>
            </div>
          </UploadZone>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Single File Upload</CardTitle>
          <CardDescription>
            Upload zone configured for single file upload only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadZone
            theme={theme}
            onFilesChange={setFiles}
            multiple={false}
            maxFiles={1}
            accept=".pdf"
            dragText="Drop your PDF file here"
            browseText="or select a PDF file"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compact Mode UploadZone</CardTitle>
          <CardDescription>
            Compact mode with button-style file selection and inline file
            display.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadZone
            theme={theme}
            onFilesChange={setFiles}
            mode="compact"
            multiple={true}
            maxFiles={3}
            accept="image/*"
            buttonText="Choose Images"
            showPreview={true}
          />
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>
              Current files in the upload queue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <pre className="text-xs bg-muted p-4 rounded overflow-auto">
                {JSON.stringify(files, null, 2)}
              </pre>
              <Button onClick={clearFiles} variant="outline">
                Clear All Files
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
