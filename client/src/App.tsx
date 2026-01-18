import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import BlogPage from "@/pages/content/blog";
import DocsPage from "@/pages/content/docs";
import ComponentsPage from "@/pages/engineering/components";
import ShowcasesPage from "@/pages/business/showcases";
import ThemePage from "@/pages/settings/theme";
import PricingPage from "@/pages/business/pricing";
import NewsletterPage from "@/pages/marketing/newsletter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/content/blog" component={BlogPage} />
      <Route path="/content/docs" component={DocsPage} />
      <Route path="/engineering/components" component={ComponentsPage} />
      <Route path="/business/showcases" component={ShowcasesPage} />
      <Route path="/settings/theme" component={ThemePage} />
      <Route path="/business/pricing" component={PricingPage} />
      <Route path="/marketing/newsletter" component={NewsletterPage} />
      
      {/* Fallbacks for routes not fully implemented yet but in sidebar */}
      <Route path="/engineering/registry" component={ComponentsPage} /> {/* Reuse Components page for now */}
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
