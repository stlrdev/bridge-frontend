"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UploadZone, UploadFile } from "./uploadzone";
import { Select } from "./select";
import { Button } from "./button";
import { Input } from "./input";
import { DatePickerInput } from "./date-picker-input";
import {
  merchantSchema,
  type MerchantFormData,
} from "@/features/merchants/schemas/merchant-schema";
import { Checkbox } from "../ui/checkbox";
import { Icons } from "./icons";

const categories = [
  "Retail",
  "Restaurant",
  "Travel",
  "Entertainment",
  "Services",
  "Technology",
  "Healthcare",
  "Education",
];

export default function AddNewMerchant() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

  const form = useForm<MerchantFormData>({
    resolver: zodResolver(merchantSchema),
    defaultValues: {
      merchantName: "",
      category: "",
      merchantStatus: false,
      fullName: "",
      emailAddress: "",
      agreementStartDate: "",
      agreementEndDate: "",
      autoRenewal: false,
    },
  });

  const onSubmit = (data: MerchantFormData) => {
    console.log("Form submitted:", {
      ...data,
      logo: uploadedFiles.length > 0 ? uploadedFiles[0].file : null,
    });
    // Handle form submission here
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold">Add New Merchant</h1>
        <p className="text-gray-600">Enter the merchant details below</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="merchantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Merchant Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Global Retail Solutions"
                          {...field}
                          errorMessage={
                            form.formState.errors.merchantName?.message
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:row-span-3 space-y-2">
                  <FormField
                    name="merchantLogo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Merchant Logo</FormLabel>
                        <FormControl>
                          <UploadZone
                            mode="area"
                            onFilesChange={field.onChange}
                            accept="image/png,image/jpeg,image/jpg"
                            maxSize={5 * 1024 * 1024} // 5MB
                            maxFiles={1}
                            multiple={false}
                            buttonText="Choose Logo"
                            showPreview={true}
                            dragText="Upload merchant logo"
                            browseText="PNG, JPG up to 5MB (Square recommended)"
                            maxSizeErrorText="Logo size exceeds 5MB limit"
                            fileTypeErrorText="Only PNG and JPG files are supported"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          options={categories.map((category) => ({
                            label: category,
                            value: category,
                          }))}
                          placeholder="Select Category"
                          className="w-full bg-transparent"
                          fullWidth
                          error={form.formState.errors.category?.message}
                          label="Category"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="merchantStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Merchant Status</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-3">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span className="text-sm text-gray-600">
                            Toggle operational visibility
                          </span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Person</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. John Doe"
                        error={
                          form.formState.errors.fullName?.message ? true : false
                        }
                        errorMessage={form.formState.errors.fullName?.message}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. john.doe@example.com"
                        error={
                          form.formState.errors.emailAddress?.message
                            ? true
                            : false
                        }
                        errorMessage={
                          form.formState.errors.emailAddress?.message
                        }
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Administration & Agreement</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="agreementStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agreement Start Date</FormLabel>
                    <FormControl>
                      <DatePickerInput />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreementEndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agreement End Date</FormLabel>
                    <FormControl>
                      <DatePickerInput
                        error={form.formState.errors.agreementEndDate?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Auto-renewal Clause */}
              <div className="space-y-4 md:col-span-2">
                <div className="flex items-start space-x-3 p-4 bg-yellow-400/10 rounded-lg">
                  <Icons.Alert className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="text-sm text-yellow-400">
                    If active, the merchant agreement will automatically extend
                    for another 12 months unless canceled 30 days prior to the
                    expiration date.
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="autoRenewal"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium">
                        Enable Auto-renewal
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          {/* Submit Button */}
          <div className="mt-auto pt-8 flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
