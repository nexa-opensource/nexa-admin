import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/lib/mock-data";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-12 py-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
          <p className="text-muted-foreground text-lg">Choose the perfect plan for your project. All plans include access to our core components.</p>
        </div>

        <div className="flex items-center justify-center gap-4">
           <Label htmlFor="billing-toggle" className={`cursor-pointer ${!isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>Monthly</Label>
           <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
           <Label htmlFor="billing-toggle" className={`cursor-pointer ${isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
              Yearly <span className="text-emerald-500 font-normal text-xs ml-1">(Save 20%)</span>
           </Label>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <Card key={plan.id} className={`relative flex flex-col border-2 shadow-lg ${plan.popular ? 'border-primary' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                   <Badge className="bg-primary text-primary-foreground hover:bg-primary px-4 py-1 rounded-full">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm mt-2">{plan.description}</CardDescription>
                <div className="mt-6 flex items-baseline gap-1">
                   <span className="text-4xl font-bold text-foreground">
                      ${isYearly ? Math.floor(plan.priceYearly / 12) : plan.priceMonthly}
                   </span>
                   <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                  {/* Add "x" for missing features based on plan if needed manually, or adjust mock data to have negative features */}
                  {plan.id === 'hobby' && (
                     <>
                        <li className="flex items-start gap-3 opacity-50">
                           <span className="h-5 w-5 flex items-center justify-center text-muted-foreground text-lg leading-none">×</span>
                           <span className="text-muted-foreground">Advanced charts</span>
                        </li>
                        <li className="flex items-start gap-3 opacity-50">
                           <span className="h-5 w-5 flex items-center justify-center text-muted-foreground text-lg leading-none">×</span>
                           <span className="text-muted-foreground">Priority support</span>
                        </li>
                     </>
                  )}
                </ul>
              </CardContent>
              <CardFooter className="pt-6 border-t bg-muted/20">
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                   {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
