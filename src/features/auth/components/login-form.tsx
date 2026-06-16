"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { loginValidationSchema, LoginValidationSchema } from "../schemas";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Icons } from "@/components/shared/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "@/lib/toast";

const defaultValues: LoginValidationSchema = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValidationSchema>({
    defaultValues,
    resolver: zodResolver(loginValidationSchema),
  });

  const handleFormSubmit = async (data: LoginValidationSchema) => {
    setIsLoading(true);
    try {
      const callbackUrl = searchParams.get("callbackUrl") ?? "/";
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <FieldSet>
          <FieldLegend></FieldLegend>
          <FieldDescription></FieldDescription>
          <FieldGroup>
            <Controller
              name="email"
              render={({ field, fieldState }) => (
                <Field>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="example@email.com"
                    autoComplete="off"
                    className="bg-background p-2 rounded-lg dark:bg-muted"
                    variant="filled"
                    leftElement={<Icons.Email size={24} />}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              render={({ field, fieldState }) => (
                <Field>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    className="bg-background p-2 rounded-lg dark:bg-muted"
                    variant="filled"
                    leftElement={<Icons.Password size={24} />}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex justify-between gap-4 items-center">
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" />
                <Label
                  htmlFor="remember-me"
                  className="text-muted-foreground text-sm"
                >
                  Remember me
                </Label>
              </div>
              <div>
                <Link
                  href="/forgot-password"
                  className="text-primary font-medium text-sm"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button type="submit" className="py-6" disabled={isLoading}>
              {isLoading ? "SIGNING IN..." : "LOGIN"}
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </Form>
  );
}
