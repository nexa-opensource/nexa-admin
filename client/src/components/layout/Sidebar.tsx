import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, BLOG_POSTS, NOTIFICATIONS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Bell, Search, Command as CommandIcon, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0">
      <div className="h-14 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <div className="size-6 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
            P
          </div>
          <span>Portal Admin</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 sidebar-scroll">
        {NAV_ITEMS.map((section) => (
          <div key={section.section}>
            <h4 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {section.section}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <button
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      )}
                    >
                      <item.icon className="size-4" />
                      {item.title}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">
              admin@portal.dev
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="h-14 border-b bg-background px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 text-muted-foreground">
        <span className="text-sm font-medium text-foreground">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          className="h-8 gap-2 text-muted-foreground bg-muted/50 border-transparent hover:bg-muted"
          onClick={() => setOpen(true)}
        >
          <Search className="size-3.5" />
          <span className="text-xs">Search...</span>
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Blog Posts">
              {BLOG_POSTS.map((post) => (
                <CommandItem key={post.id} onSelect={() => setOpen(false)}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 relative">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-background" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h4 className="font-semibold text-sm">Notifications</h4>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {NOTIFICATIONS.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 size-2 rounded-full ${notification.read ? "bg-muted-foreground/30" : "bg-blue-500"}`}
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground pt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
