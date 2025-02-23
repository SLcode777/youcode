import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>CECI EST LE TITRE DE LA CARD</CardTitle>
          <CardContent>Et ceci est le contenu</CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
