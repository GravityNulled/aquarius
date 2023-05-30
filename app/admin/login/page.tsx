"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Email or password is incorrect",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login with your account</CardTitle>
          <CardDescription>Login as Admin</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Login;
