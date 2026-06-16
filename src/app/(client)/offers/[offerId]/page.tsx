"use client";

import Container from "@/components/layout/container";
import { Button } from "@/components/shared/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/lib/toast";
import { Icons } from "@/components/shared/icons";
import { merchants } from "@/data/merchants";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { formatCurrency } from "@/lib/utils";

export default function OfferDetailsPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = React.use(params);

  const offer = merchants.find((merchant) => merchant.id === offerId);
  return (
    <Container>
      <Card className="max-w-2xl mx-auto my-20 pt-0 overflow-hidden">
        <CardHeader className="bg-gray-200 p-5">
          <CardTitle>{offer?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="text-lg text-primary font-bold mb-2 text-center">
            SHOW TO CASHIER
          </h4>
          <p className="text-center text-sm text-muted">
            Scan the QR code or enter the code manually.
          </p>
          <div className="flex items-center justify-center my-10">
            <Image
              src="/images/qr.png"
              alt="QR Code"
              width={200}
              height={200}
            />
          </div>

          <div className="bg-white flex justify-between items-end p-4 rounded-lg">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">VOUCHER CODE</p>
              <code className="font-semibold text-primary">CODE</code>
            </div>
            <div>
              <Button
                size="icon-sm"
                onClick={() => {
                  navigator.clipboard.writeText("CODE");
                  toast.success("Voucher code copied to clipboard!");
                }}
              >
                <Icons.Copy color="#ffffff" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  EXPIRES ON
                </span>
                <span className="text-md font-medium">2025-10-25</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground">VALUE</span>
                <span className="text-md font-medium">
                  {formatCurrency(10)} Credit
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 my-10">
              <span className="text-xs font-semibold text-muted-foreground text-right">
                PRIVACY POLICY
              </span>
              <Separator
                orientation="vertical"
                color="red"
                className="font-bold"
              />
              <span className="text-xs font-semibold text-muted-foreground text-left">
                TERMS OF SERVICE
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Container>
  );
}
