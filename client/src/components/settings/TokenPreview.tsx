import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TokenPreview() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Live preview of your theme tokens.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4 flex-wrap">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="bg-primary text-primary-foreground border-none">
                <CardHeader>
                  <CardTitle>Primary Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Using the primary color token as background.
                </CardContent>
             </Card>
             <Card className="bg-secondary text-secondary-foreground border-none">
                <CardHeader>
                  <CardTitle>Secondary Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Using the secondary color token.
                </CardContent>
             </Card>
          </div>

          <div className="flex gap-2">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
