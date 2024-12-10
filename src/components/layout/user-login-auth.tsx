"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
  email: string;
  password: string;
}
export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [data, setData] = useState<IUser>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      toast({
        title: "Oops",
        description: res.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
        ),
      });
    } else {
      router.push("/");
    }
    setData({
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}
