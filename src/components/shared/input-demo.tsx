import React, { useState } from "react";
import { Input } from "./input";
import { Search, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export function InputDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-8 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Enhanced Input Component Demo</h1>
      
      {/* Basic Variants */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Variants</h2>
        <Input placeholder="Default variant" />
        <Input variant="filled" placeholder="Filled variant" />
        <Input variant="outlined" placeholder="Outlined variant" />
        <Input variant="underlined" placeholder="Underlined variant" />
        <Input variant="ghost" placeholder="Ghost variant" />
        <Input variant="glass" placeholder="Glass variant" className="text-white" />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <Input size="xs" placeholder="Extra small" />
        <Input size="sm" placeholder="Small" />
        <Input size="default" placeholder="Default" />
        <Input size="lg" placeholder="Large" />
        <Input size="xl" placeholder="Extra large" />
        <Input size="2xl" placeholder="2X large" />
      </div>

      {/* States */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">States</h2>
        <Input state="success" placeholder="Success state" />
        <Input state="warning" placeholder="Warning state" />
        <Input state="error" placeholder="Error state" />
        <Input disabled placeholder="Disabled state" />
      </div>

      {/* With Left Elements */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">With Left Elements</h2>
        <Input
          leftElement={<Search className="h-4 w-4" />}
          placeholder="Search with icon"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Input
          leftElement={<Mail className="h-4 w-4" />}
          placeholder="Email with icon"
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <Input
          leftElement={<User className="h-4 w-4" />}
          placeholder="Username with icon"
        />
      </div>

      {/* With Right Elements */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">With Right Elements</h2>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password with toggle"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
        <Input
          placeholder="With success indicator"
          state="success"
          rightElement={<CheckCircle className="h-4 w-4 text-green-500" />}
        />
        <Input
          placeholder="With error indicator"
          state="error"
          rightElement={<AlertCircle className="h-4 w-4 text-red-500" />}
        />
      </div>

      {/* With Both Left and Right Elements */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">With Both Elements</h2>
        <Input
          leftElement={<Search className="h-4 w-4" />}
          rightElement={
            <button
              type="button"
              onClick={handleSearch}
              className="hover:text-foreground transition-colors"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </button>
          }
          placeholder="Search with loading"
          loading={loading}
        />
        <Input
          leftElement={<Lock className="h-4 w-4" />}
          type="password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          placeholder="Password with lock icon"
        />
      </div>

      {/* Custom Radius */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Custom Radius</h2>
        <Input radius="none" placeholder="No radius" />
        <Input radius="sm" placeholder="Small radius" />
        <Input radius="md" placeholder="Medium radius" />
        <Input radius="lg" placeholder="Large radius" />
        <Input radius="xl" placeholder="Extra large radius" />
        <Input radius="full" placeholder="Full radius" />
      </div>

      {/* Custom Styling */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Custom Styling</h2>
        <Input
          leftElement={<Search className="h-4 w-4" />}
          leftElementClassName="bg-blue-100 text-blue-600"
          rightElement={<button className="text-blue-600 hover:text-blue-700">Search</button>}
          rightElementClassName="bg-blue-50 hover:bg-blue-100 transition-colors"
          containerClassName="border-2 border-blue-200"
          placeholder="Custom styled elements"
        />
      </div>

      {/* Interactive Examples */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Interactive Examples</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Click the button to clear"
            rightElement={
              <button
                type="button"
                onClick={() => setSearchValue("")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
