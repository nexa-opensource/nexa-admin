import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenPreview } from "@/components/settings/TokenPreview";
import { RefreshCw, Save } from "lucide-react";

export default function ThemePage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Theme & Tokens</h1>
            <p className="text-muted-foreground">Manage your design system tokens and variables.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Colors</CardTitle>
                <CardDescription>Base brand colors for the system.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <div className="size-10 rounded border bg-primary shadow-sm" />
                    <Input defaultValue="262 83% 58%" className="font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="flex gap-2">
                    <div className="size-10 rounded border bg-accent shadow-sm" />
                    <Input defaultValue="240 5% 96%" className="font-mono" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Layout & Spacing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Base Radius</Label>
                  <div className="flex items-center gap-4">
                     <Input type="range" min="0" max="20" defaultValue="8" className="flex-1" />
                     <span className="font-mono text-sm w-12">0.5rem</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Success</Label>
                  <div className="flex gap-2">
                    <div className="size-8 rounded border bg-emerald-500 shadow-sm" />
                    <Input defaultValue="#10B981" className="font-mono h-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Warning</Label>
                  <div className="flex gap-2">
                    <div className="size-8 rounded border bg-amber-500 shadow-sm" />
                    <Input defaultValue="#F59E0B" className="font-mono h-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Error</Label>
                  <div className="flex gap-2">
                    <div className="size-8 rounded border bg-destructive shadow-sm" />
                    <Input defaultValue="#EF4444" className="font-mono h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <TokenPreview />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
