import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SHOWCASES, ShowcaseItem } from "@/lib/mock-data";
import {
  Plus,
  Search,
  ExternalLink,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ShowcasesPage() {
  const [showcases, setShowcases] = useState<ShowcaseItem[]>(SHOWCASES);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleStatusChange = (
    id: string,
    newStatus: ShowcaseItem["status"],
  ) => {
    setShowcases(
      showcases.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setShowcases(showcases.filter((item) => item.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Showcase Registry
            </h1>
            <p className="text-muted-foreground">
              Manage community submitted projects.
            </p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add to Showcase</DialogTitle>
                <DialogDescription>
                  Manually add a project to the showcase gallery.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Project Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="text-right">
                    URL
                  </Label>
                  <Input
                    id="url"
                    placeholder="https://"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">
                    Author
                  </Label>
                  <Input
                    id="author"
                    placeholder="Developer Name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddOpen(false)}>
                  Save Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              All
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-muted"
            >
              Pending
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-muted"
            >
              Approved
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="aspect-video relative bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      item.status === "approved"
                        ? "default"
                        : item.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(item.id, "approved")}
                      >
                        <Check className="mr-2 h-4 w-4" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(item.id, "rejected")}
                      >
                        <X className="mr-2 h-4 w-4" /> Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex items-center justify-between text-xs text-muted-foreground">
                <span>by {item.author}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Visit <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
