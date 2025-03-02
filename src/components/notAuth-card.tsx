"use client";

import { redirect } from "next/navigation";
import LoginButton from "./features/login-logout-menu/login-button";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const NotAuthenticatedCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu dois être connecté(e) pour voir ce contenu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <LoginButton variant={"outline"} size={"lg"} />
          <Button
            variant={"outline"}
            className="h-10"
            onClick={() => redirect("/")}
          >
            Retourner à l&apos;accueil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
