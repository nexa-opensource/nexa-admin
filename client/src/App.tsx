import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import BlogPage from "@/pages/content/blog";
import NewsletterPage from "@/pages/marketing/newsletter";
import UsersPage from "@/pages/settings/users";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/content/blog" component={BlogPage} />
      <Route path="/marketing/newsletter" component={NewsletterPage} />
      <Route path="/settings/users" component={UsersPage} />
      
      {/* Fallbacks for routes that were removed */}
      <Route path="/content/docs" component={NotFound} />
      <Route path="/engineering/components" component={NotFound} />
      <Route path="/engineering/registry" component={NotFound} />
      <Route path="/business/showcases" component={NotFound} />
      <Route path="/business/pricing" component={NotFound} />
      <Route path="/settings/theme" component={NotFound} />
      
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
