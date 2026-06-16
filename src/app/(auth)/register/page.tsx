import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <div className="absolute inset-20 max-w-[500px] left-1/2 -translate-x-1/2 bg-primary rounded-[100%] blur-[70px] -z-1" />
      <main className="relative flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-4 my-20">
          <div className="w-14 aspect-square rounded-lg bg-white flex items-center justify-center">
            <span className="font-bold text-2xl text-primary">S</span>
          </div>
          <h3 className="font-black text-white text-4xl">STLR</h3>
        </div>
        <Card className="min-w-[300px] w-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Register
            </CardTitle>
            <CardDescription className="text-sm text-center">
              Account registration is coming soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Self-registration is not yet available. Please contact your
              administrator to get access.
            </p>
            <Link href="/login" className="text-primary font-medium text-sm">
              Back to login
            </Link>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
