import React from "react";
import { Input } from "./input";
import { Icons } from "./icons";

export function InputTest() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Testing Left Element</h2>
      
      {/* Test with Icons.Email */}
      <Input
        leftElement={<Icons.Email />}
        placeholder="Email with Icons.Email"
        variant="filled"
      />
      
      {/* Test with Icons.Lock */}
      <Input
        leftElement={<Icons.Lock />}
        placeholder="Password with Icons.Lock"
        type="password"
        variant="filled"
      />
      
      {/* Test with custom props */}
      <Input
        leftElement={<Icons.Email size={20} className="text-blue-500" />}
        placeholder="Email with custom styling"
        variant="filled"
      />
      
      {/* Test right element */}
      <Input
        rightElement={<Icons.Lock />}
        placeholder="With right element"
        variant="filled"
      />
      
      {/* Test both elements */}
      <Input
        leftElement={<Icons.Email />}
        rightElement={<Icons.Lock />}
        placeholder="Both elements"
        variant="filled"
      />
    </div>
  );
}
