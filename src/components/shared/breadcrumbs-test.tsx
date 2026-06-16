"use client"

import { Breadcrumb } from "./breadcrumbs"

export function BreadcrumbsTest() {
  // Test different breadcrumb scenarios
  const testCases = [
    {
      name: "Basic Admin Route",
      items: [{ label: "Admin", isActive: true }]
    },
    {
      name: "Nested Route",
      items: [
        { label: "Admin", href: "/admin" },
        { label: "Companies", href: "/admin/companies" },
        { label: "Add", isActive: true }
      ]
    },
    {
      name: "Dynamic Route",
      items: [
        { label: "Admin", href: "/admin" },
        { label: "Offers", href: "/admin/offers" },
        { label: "Details", isActive: true }
      ]
    }
  ]

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Breadcrumbs Test</h1>
      
      {testCases.map((testCase, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold">{testCase.name}</h3>
          <Breadcrumb items={testCase.items} />
        </div>
      ))}
    </div>
  )
}
