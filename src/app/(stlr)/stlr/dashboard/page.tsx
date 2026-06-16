import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StlrDashboardPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <header className="mb-6">
        <h2 className="text-lg font-bold">STLR Dashboard</h2>
        <p className="text-xs text-muted-foreground">
          Platform-wide analytics and administration
        </p>
      </header>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The STLR admin dashboard is under construction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
