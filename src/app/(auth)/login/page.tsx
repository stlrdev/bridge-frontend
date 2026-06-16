import { Suspense } from "react";
import { Icons } from "@/components/shared/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
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
        <div className="relative">
          <Card className="min-w-[300px] w-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">
                Employee Login
              </CardTitle>
              <CardDescription className="text-sm text-center">
                Access your benefits dashboard securely.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense>
                <LoginForm />
              </Suspense>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-2 my-4">
                <Icons.Lock />
                <span className="text-xs font-semibold text-muted-foreground">
                  SECURE256-BIT ENCRYPTION
                </span>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
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
            </CardFooter>
          </Card>
          <div className="flex flex-col items-center justify-center mt-5">
            <p className="text-white text-center font-semibold">
              Having trouble logging in?
              <br />
              Contact our support.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
