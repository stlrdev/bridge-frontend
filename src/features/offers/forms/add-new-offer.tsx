"use client";

import { Button } from "@/components/shared/button";
import { Icons } from "@/components/shared/icons";
import { Input } from "@/components/shared/input";
import { Select } from "@/components/shared/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { merchants } from "@/data/admin-merchants";
import { useForm } from "react-hook-form";
import { CreateOfferFormValues } from "@/features/offers/schema";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { type DateRange } from "react-day-picker";

export default function AddNewOffer() {
  const form = useForm<CreateOfferFormValues>({
    defaultValues: {
      title: "",
      merchantId: "",
      discountValue: 0,
      discountType: "PERCENTAGE",
      tier: "BASIC",
      validFrom: "",
      validUntil: "",
      voucherType: "ONE_TIME_USE",
    },
  });

  // Handle date range changes and update string fields
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      // Convert dates to ISO strings for form
      const fromString = range.from.toISOString().split("T")[0];
      const toString = range.to.toISOString().split("T")[0];

      form.setValue("validFrom", fromString);
      form.setValue("validUntil", toString);
      form.setValue("validityRange", range);
    } else {
      form.setValue("validFrom", "");
      form.setValue("validUntil", "");
      // Don't set undefined for required field, let validation handle it
      form.setValue("validityRange", { from: undefined, to: undefined });
    }
  };

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-5 mt-8">
          <div className="col-span-2 flex flex-col gap-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icons.Info className="text-primary" size={20} />
                  <span className="text-lg font-semibold">
                    General Information
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">Offer Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Summer Special 25% Off"
                          {...field}
                          error={!!form.formState.errors.title}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="merchantId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            options={merchants.map((merchant) => ({
                              label: merchant.name,
                              value: merchant.id,
                            }))}
                            onValueChange={field.onChange}
                            placeholder="Select Merchant"
                            className="w-full bg-transparent"
                            fullWidth
                            error={form.formState.errors.merchantId?.message}
                            label="Merchant"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1">Discount</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-muted-foreground">
                              %
                            </span>
                            <Input
                              placeholder="e.g. 10"
                              type="number"
                              className="grow w-full"
                              {...field}
                              error={!!form.formState.errors.title}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icons.Info className="text-primary" size={20} />
                  <span className="text-lg font-semibold">Offer Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the offer details, benefits and what the customer gets..."
                          className="grow w-full min-h-[100px] max-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icons.Info className="text-primary" size={20} />
                  <span className="text-lg font-semibold">
                    Logistics and Configuration
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="voucherType"
                    render={({ field }) => (
                      <FormItem className="align-self-start ">
                        <FormLabel className="mb-1">Voucher Type</FormLabel>
                        <FormControl>
                          <div className="flex gap-2 bg-muted rounded-lg">
                            <button
                              type="button"
                              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                field.value === "ONE_TIME_USE"
                                  ? "bg-primary text-muted"
                                  : "bg-transparent text-muted-foreground hover:bg-primary/10 cursor-pointer"
                              }`}
                              onClick={() => field.onChange("ONE_TIME_USE")}
                            >
                              One-Time Use
                            </button>
                            <button
                              type="button"
                              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                field.value === "REUSABLE"
                                  ? "bg-primary text-muted"
                                  : "bg-transparent text-muted-foreground hover:bg-primary/10 cursor-pointer"
                              }`}
                              onClick={() => field.onChange("REUSABLE")}
                            >
                              Reusable
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormField
                      control={form.control}
                      name="validityRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-3">
                            Offer Validity Range
                          </FormLabel>
                          <FormControl className="flex justify-start">
                            <DateRangePicker
                              value={field.value}
                              onChange={handleDateRangeChange}
                              enablePresets={true}
                              presets={[
                                "next7Days",
                                "next30Days",
                                "nextMonth",
                                "next90Days",
                                "nextYear",
                              ]}
                              requireBothDates={true}
                              placeholder="Select offer validity period"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icons.Info className="text-primary" size={20} />
                  <span className="text-lg font-semibold">Tier Visibility</span>
                </CardTitle>
                <CardDescription>
                  Select which membership tiers can view and redeem this offer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="merchantId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <div className="flex flex-col gap-3">
                            {["bronze", "silver", "gold", "platinum"].map(
                              (tier) => (
                                <div
                                  key={tier}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox id={tier} value={tier} />
                                  <Label htmlFor={tier} className="capitalize">
                                    {tier}
                                  </Label>
                                </div>
                              ),
                            )}
                          </div>
                          <Button
                            className="mt-4"
                            onClick={() =>
                              field.onChange([
                                "bronze",
                                "silver",
                                "gold",
                                "platinum",
                              ])
                            }
                            variant="glass"
                            size="sm"
                            type="button"
                          >
                            <Icons.AddCircle />
                            Select All Tiers
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
