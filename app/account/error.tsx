"use client"; // Error boundaries must be Client Components

import LoginButton from "@/components/features/login-logout-menu/login-button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
}: // reset,
{
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card className="w-full max-w-lg m-auto bg-neutral-900">
      <CardHeader>
        <CardTitle>You need to be logged to view this page</CardTitle>
      </CardHeader>
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  );
}
