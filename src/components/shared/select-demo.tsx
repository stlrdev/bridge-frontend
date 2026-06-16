"use client";

import React from "react";
import { Select } from "./select";
import { Icons } from "./icons";

export default function SelectDemo() {
  const [value, setValue] = React.useState("");

  const options = [
    {
      value: "dashboard",
      label: "Dashboard",
      description: "View analytics and metrics",
      icon: <Icons.Dashboard />,
    },
    {
      value: "users",
      label: "Users",
      description: "Manage user accounts",
      icon: <Icons.Users />,
    },
    {
      value: "vouchers",
      label: "Vouchers",
      description: "Create and manage vouchers",
      icon: <Icons.TicketSale />,
    },
    {
      value: "merchants",
      label: "Merchants",
      description: "Manage merchant partners",
      icon: <Icons.Folder />,
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-md">
      <h2 className="text-2xl font-bold">Enhanced Select Demo</h2>

      {/* Basic usage with prefix icon */}
      <Select
        label="Select an option"
        options={options}
        value={value}
        onValueChange={setValue}
        prefixIcon={<Icons.UserCircle />}
        placeholder="Choose an option..."
        helperText="This is a helper text"
      />

      {/* Searchable select */}
      <Select
        label="Searchable Select"
        options={options}
        value={value}
        onValueChange={setValue}
        searchable
        placeholder="Search options..."
        helperText="You can search through options"
      />

      {/* With error state */}
      <Select
        label="With Error"
        options={options}
        value={value}
        onValueChange={setValue}
        error="This field is required"
        placeholder="Select something..."
      />

      {/* Loading state */}
      <Select
        label="Loading State"
        options={options}
        value={value}
        onValueChange={setValue}
        loading
        placeholder="Loading options..."
      />

      {/* Auto width demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Auto Width Feature</h3>

        <Select
          label="Auto Width (Default)"
          options={options}
          value={value}
          onValueChange={setValue}
          prefixIcon={<Icons.UserCircle />}
          placeholder="Choose an option..."
          helperText="Automatically adjusts to longest option"
        />

        <Select
          label="Fixed Width (autoWidth=false)"
          options={options}
          value={value}
          onValueChange={setValue}
          prefixIcon={<Icons.UserCircle />}
          placeholder="Choose an option..."
          autoWidth={false}
          fullWidth={false}
          helperText="Uses default width"
        />

        <Select
          label="Full Width (fullWidth=true)"
          options={options}
          value={value}
          onValueChange={setValue}
          prefixIcon={<Icons.UserCircle />}
          placeholder="Choose an option..."
          fullWidth={true}
          helperText="Takes full container width"
        />
      </div>

      {/* Different sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>

        <Select
          label="Small Size"
          options={options}
          value={value}
          onValueChange={setValue}
          size="sm"
          placeholder="Small select..."
        />

        <Select
          label="Default Size"
          options={options}
          value={value}
          onValueChange={setValue}
          size="default"
          placeholder="Default select..."
        />

        <Select
          label="Large Size"
          options={options}
          value={value}
          onValueChange={setValue}
          size="lg"
          placeholder="Large select..."
        />
      </div>

      {/* Different variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Variants</h3>

        <Select
          label="Default Variant"
          options={options}
          value={value}
          onValueChange={setValue}
          variant="default"
          placeholder="Default variant..."
        />

        <Select
          label="Outline Variant"
          options={options}
          value={value}
          onValueChange={setValue}
          variant="outline"
          placeholder="Outline variant..."
        />

        <Select
          label="Ghost Variant"
          options={options}
          value={value}
          onValueChange={setValue}
          variant="ghost"
          placeholder="Ghost variant..."
        />
      </div>
    </div>
  );
}
