import Container from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VouchersPage() {
  return (
    <Container className="my-20">
      <h1 className="text-4xl font-extrabold">Vouchers</h1>
      <p className="text-muted-foreground mt-2">View and manage your vouchers.</p>
      <Card className="mt-10 max-w-md">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The vouchers page is under construction.
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
