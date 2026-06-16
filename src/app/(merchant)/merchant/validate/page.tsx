"use client";

import { useState } from "react";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useVerifyVoucher, useRedeemVoucher } from "@/features/vouchers/hooks";
import type { ValidationResult } from "@/features/vouchers/types";
import { toast } from "@/lib/toast";

export default function ValidateVoucherPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);

  const verify = useVerifyVoucher();
  const redeem = useRedeemVoucher();

  const handleVerify = () => {
    if (!code.trim()) return;
    verify.mutate(code.trim(), {
      onSuccess: (data) => setResult(data),
      onError: () => toast.error("Failed to verify voucher"),
    });
  };

  const handleRedeem = () => {
    if (!result?.voucher) return;
    redeem.mutate(
      {
        voucherCode: result.voucher.code,
        verificationMethod: "manual_entry",
      },
      {
        onSuccess: () => {
          toast.success("Voucher redeemed successfully");
          setCode("");
          setResult(null);
        },
        onError: () => toast.error("Failed to redeem voucher"),
      },
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Voucher Validation
            </CardTitle>
            <CardDescription className="text-center">
              Enter a voucher code to validate at point of sale.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter voucher code"
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              />
              <Button
                onClick={handleVerify}
                disabled={verify.isPending || !code.trim()}
              >
                {verify.isPending ? "Checking..." : "Verify"}
              </Button>
            </div>

            {result && (
              <div
                className={`rounded-lg p-4 ${
                  result.isValid
                    ? "bg-green-500/10 border border-green-500/20"
                    : "bg-red-500/10 border border-red-500/20"
                }`}
              >
                <p
                  className={`font-semibold mb-2 ${
                    result.isValid ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {result.isValid ? "✓ Valid Voucher" : "✗ Invalid Voucher"}
                </p>
                <p className="text-sm text-muted-foreground">{result.message}</p>

                {result.isValid && result.voucher && (
                  <div className="mt-3 space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Merchant:</span>{" "}
                      {result.voucher.merchantName}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span>{" "}
                      <span className="capitalize">
                        {result.voucher.type.replace(/_/g, " ")}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Value:</span>{" "}
                      {result.voucher.type === "percentage"
                        ? `${result.voucher.value}%`
                        : `$${parseFloat(result.voucher.value).toFixed(2)}`}
                    </p>
                  </div>
                )}

                {result.isValid && !result.alreadyRedeemed && (
                  <Button
                    className="mt-4 w-full"
                    onClick={handleRedeem}
                    disabled={redeem.isPending}
                  >
                    {redeem.isPending ? "Redeeming..." : "Confirm Redemption"}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
