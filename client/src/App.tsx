import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import BlogPage from "@/pages/content/blog";
import ThemePage from "@/pages/settings/theme";
import PricingPage from "@/pages/business/pricing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/content/blog" component={BlogPage} />
      <Route path="/settings/theme" component={ThemePage} />
      <Route path="/business/pricing" component={PricingPage} />
      {/* Fallbacks for routes not fully implemented yet but in sidebar */}
      <Route path="/content/docs" component={NotFound} />
      <Route path="/engineering/components" component={NotFound} />
      <Route path="/engineering/registry" component={NotFound} />
      <Route path="/business/showcases" component={NotFound} />
      <Route path="/settings/users" component={NotFound} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
