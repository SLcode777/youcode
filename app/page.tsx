import AuthButton from "@/components/auth-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>CECI EST LE TITRE DE LA CARD</CardTitle>
          <CardContent>Et ceci est le contenu</CardContent>
        </CardHeader>
      </Card>
      <AuthButton />
    </>
  );
}
