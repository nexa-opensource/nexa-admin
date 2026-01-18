import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/lib/mock-data";
import { Check, Plus, Trash2, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pricing Plans</h1>
            <p className="text-muted-foreground">Manage your subscription packages.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Plan
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <Card key={plan.id} className="relative flex flex-col">
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                   <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex gap-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">${plan.priceMonthly}</span>
                  <span className="text-xs"> / {plan.metric}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 border-t">
                <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
                   <span>CTA: "{plan.cta}"</span>
                   <span className="font-mono uppercase">{plan.id}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border-dashed flex items-center justify-center p-6 min-h-[300px] cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="text-center space-y-2">
               <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mx-auto">
                 <Plus className="h-5 w-5 text-muted-foreground" />
               </div>
               <h3 className="font-medium text-sm">Add Custom Plan</h3>
               <p className="text-xs text-muted-foreground">Create a new pricing tier</p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
