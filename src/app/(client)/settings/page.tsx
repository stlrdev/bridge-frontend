import Container from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Container className="my-20">
      <h1 className="text-4xl font-extrabold">Settings</h1>
      <p className="text-muted-foreground mt-2">Manage your account preferences.</p>
      <Card className="mt-10 max-w-md">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Account settings are under construction.
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
