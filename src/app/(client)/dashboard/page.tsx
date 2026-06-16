import Container from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <Container className="my-20">
      <h1 className="text-4xl font-extrabold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Your benefits overview.</p>
      <Card className="mt-10 max-w-md">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your employee dashboard is under construction.
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
