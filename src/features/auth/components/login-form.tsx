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

const defaultValues: LoginValidationSchema = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const form = useForm<LoginValidationSchema>({
    defaultValues,
    resolver: zodResolver(loginValidationSchema),
  });

  const handleFormSubmit = (data: LoginValidationSchema) => {
    console.log(data);
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
            <Button type="submit" className="py-6 ">
              LOGIN
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </Form>
  );
}
