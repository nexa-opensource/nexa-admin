import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { COMPONENTS, ComponentItem } from "@/lib/mock-data";
import { Plus, Search, Code, Eye, Settings } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function ComponentsPage() {
  const [components, setComponents] = useState<ComponentItem[]>(COMPONENTS);
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Component Registry
            </h1>
            <p className="text-muted-foreground">
              Manage UI components and their configurations.
            </p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Component
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Component</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Component Name</Label>
                  <Input id="name" placeholder="e.g. Accordion" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of functionality"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Base</option>
                      <option>Composite</option>
                      <option>Layout</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Stable</option>
                      <option>Beta</option>
                      <option>Deprecated</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddOpen(false)}>
                  Create Component
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter components..." className="pl-9" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((item) => (
            <Card
              key={item.id}
              className="hover:border-primary/50 transition-colors cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  <Badge
                    variant={item.status === "stable" ? "outline" : "secondary"}
                  >
                    {item.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border bg-muted/50 p-6 flex items-center justify-center min-h-[120px]">
                  {/* Preview Placeholder */}
                  {item.name === "Button" ? (
                    <div className="flex gap-2">
                      <Button size="sm">Default</Button>
                      <Button size="sm" variant="secondary">
                        Secondary
                      </Button>
                    </div>
                  ) : item.name === "Input" ? (
                    <Input
                      placeholder="Email"
                      className="h-8 text-xs w-full max-w-[180px]"
                    />
                  ) : item.name === "Badge" ? (
                    <div className="flex gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="destructive">Error</Badge>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      No preview available
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary" className="font-normal text-xs">
                    {item.category}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Code className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
