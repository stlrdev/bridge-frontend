import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ValidateVoucherPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Voucher Validation
          </CardTitle>
          <CardDescription className="text-center">
            Validate customer vouchers at point of sale.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">
            Coming Soon — this feature is under construction.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
