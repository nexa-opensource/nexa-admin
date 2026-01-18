import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TokenPreview } from "@/components/settings/TokenPreview";
import { Moon, Sun } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

const COLORS = [
  { name: "Zinc", class: "bg-zinc-950" },
  { name: "Red", class: "bg-red-500" },
  { name: "Rose", class: "bg-rose-500" },
  { name: "Orange", class: "bg-orange-500" },
  { name: "Green", class: "bg-emerald-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Yellow", class: "bg-yellow-400" },
  { name: "Violet", class: "bg-violet-500" },
];

export default function ThemePage() {
  const [activeColor, setActiveColor] = useState("Zinc");
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Theme Customizer</h1>
          <p className="text-muted-foreground text-lg">Customize your UI experience. Pick a style and color for your components.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Preview Area */}
          <div className="lg:col-span-3 border rounded-xl p-6 bg-background shadow-sm">
             <div className="mb-8">
               <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
               <p className="text-muted-foreground">Overview of your project activity.</p>
             </div>
             
             <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                   <Card>
                      <CardHeader className="pb-2">
                         <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <div className="text-2xl font-bold">$45,231.89</div>
                         <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
                      </CardContent>
                   </Card>
                   <Card>
                      <CardHeader className="pb-2">
                         <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <div className="text-2xl font-bold">+2350</div>
                         <p className="text-xs text-muted-foreground mt-1">+180.1% from last month</p>
                      </CardContent>
                   </Card>
                </div>

                <div className="border rounded-lg p-6 bg-card">
                   <h3 className="font-medium mb-4">Form Elements</h3>
                   <div className="flex flex-wrap gap-4">
                      <Button>Primary Button</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="destructive">Destructive</Button>
                   </div>
                </div>
             </div>
          </div>

          {/* Controls Sidebar */}
          <div className="space-y-8">
             <div className="space-y-3">
                <Label className="text-base font-semibold">Color</Label>
                <div className="grid grid-cols-3 gap-2">
                   {COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setActiveColor(color.name)}
                        className={cn(
                           "flex items-center gap-2 px-2 py-1.5 rounded-md border text-xs font-medium transition-all hover:bg-muted",
                           activeColor === color.name ? "border-primary ring-1 ring-primary" : "border-border"
                        )}
                      >
                         <span className={cn("size-3 rounded-full shrink-0", color.class)} />
                         {color.name}
                      </button>
                   ))}
                </div>
             </div>

             <div className="space-y-3">
                <Label className="text-base font-semibold">Mode</Label>
                <div className="bg-muted p-1 rounded-lg grid grid-cols-2 gap-1">
                   <button 
                     onClick={() => setMode("light")}
                     className={cn(
                        "flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-md transition-all",
                        mode === "light" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                     )}
                   >
                      <Sun className="h-4 w-4" /> Light
                   </button>
                   <button 
                     onClick={() => setMode("dark")}
                     className={cn(
                        "flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-md transition-all",
                        mode === "dark" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                     )}
                   >
                      <Moon className="h-4 w-4" /> Dark
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
