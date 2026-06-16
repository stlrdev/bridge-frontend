"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, Plus, ChevronDown } from "lucide-react";
import { companySchema, type CompanyFormData } from "@/companies/schemas";
import { merchants as availableMerchants } from "@/data/admin-merchants";

export default function AddNewCompany() {
  const [merchants, setMerchants] = useState<string[]>([
    "Brew & Beans Co.",
    "TechMart Solutions",
    "Delta Airlines",
  ]);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      companyStatus: "ACTIVE",
      accountTier: "",
      monthlyPlatformFee: "",
      estimatedEmployeeCount: 2450,
      contractValidityStart: "2023-01-01",
      contractValidityEnd: "2025-12-31",
      customMerchantAccess: merchants,
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    console.log("Form submitted:", {
      ...data,
      customMerchantAccess: merchants,
    });
    // Handle form submission here
  };

  const addMerchant = (merchant: string) => {
    if (!merchants.includes(merchant)) {
      setMerchants([...merchants, merchant]);
      form.setValue("customMerchantAccess", [...merchants, merchant]);
    }
  };

  const removeMerchant = (merchantToRemove: string) => {
    const updatedMerchants = merchants.filter((m) => m !== merchantToRemove);
    setMerchants(updatedMerchants);
    form.setValue("customMerchantAccess", updatedMerchants);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Add New Company</h1>
        <p className="text-gray-600">Enter the company details below</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* General Information */}
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">General Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Global Tech Solutions Inc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Status</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={field.value === "ACTIVE"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "ACTIVE" : "INACTIVE")
                          }
                        />
                        <span className="text-sm font-medium">
                          {field.value}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Tier</FormLabel>
                    <FormControl>
                      <Input placeholder="Enterprise Plus" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyPlatformFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Platform Fee ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="$ 12500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Contract & Scale */}
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Contract & Scale</h2>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="estimatedEmployeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Estimated Employee Count: {field.value}
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={10}
                          max={10000}
                          step={10}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>10</span>
                          <span>10,000</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contractValidityStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Validity Start</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contractValidityEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Validity End</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Advanced Overrides */}
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Advanced Overrides</h2>

            <div className="space-y-4">
              <FormLabel>Custom Merchant Access Override</FormLabel>

              {/* Merchant Tags */}
              <div className="flex flex-wrap gap-2">
                {merchants.map((merchant) => (
                  <div
                    key={merchant}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    <span>{merchant}</span>
                    <button
                      type="button"
                      onClick={() => removeMerchant(merchant)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Merchant Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    ADD MERCHANT
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {availableMerchants
                    .filter((merchant) => !merchants.includes(merchant.name))
                    .map((merchant) => (
                      <DropdownMenuItem
                        key={merchant.id}
                        onClick={() => addMerchant(merchant.name)}
                      >
                        {merchant.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Add Company</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
