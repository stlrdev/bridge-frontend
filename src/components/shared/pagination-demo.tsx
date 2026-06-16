"use client";

import React, { useState } from "react";
import { Pagination } from "./pagination";

export function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default Theme (Auto)</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Light Theme</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          theme="light"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dark Theme</h3>
        <div className="dark bg-background p-4 rounded-lg border">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            theme="dark"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Default Variant</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="default"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Outline Variant</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="outline"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Ghost Variant</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="ghost"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Small Size</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            size="sm"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Medium Size (Default)</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            size="md"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Large Size</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            size="lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Options</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Without Previous/Next Buttons</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showPreviousNext={false}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Without Ellipsis</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showEllipsis={false}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Custom Styling</p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="justify-center"
            theme="light"
            variant="outline"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}
