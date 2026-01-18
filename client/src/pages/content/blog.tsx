import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOG_POSTS } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { RichTextEditor } from "@/components/content/RichTextEditor";
import { Separator } from "@/components/ui/separator";

export default function BlogPage() {
  const [view, setView] = useState<"list" | "edit">("list");

  return (
    <AdminLayout>
      {view === "list" ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
              <p className="text-muted-foreground">Manage your articles and announcements.</p>
            </div>
            <Button onClick={() => setView("edit")}>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-9" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BLOG_POSTS.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === "published" ? "default" : post.status === "draft" ? "secondary" : "outline"}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{post.publishedAt}</TableCell>
                    <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setView("edit")}>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Live</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => setView("list")}>Back</Button>
                <h1 className="text-xl font-bold">New Blog Post</h1>
             </div>
             <div className="flex gap-2">
                <Button variant="ghost">Save Draft</Button>
                <Button>Publish</Button>
             </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
               <div className="space-y-2">
                  <Input placeholder="Post Title" className="text-2xl font-bold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50" />
                  <Input placeholder="post-slug-url" className="font-mono text-sm text-muted-foreground border-none px-0 h-auto focus-visible:ring-0" />
               </div>
               <RichTextEditor />
            </div>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4 bg-card space-y-4">
                 <h3 className="font-semibold text-sm">Publishing Details</h3>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Author</label>
                    <Input defaultValue="Sarah Connor" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Publish Date</label>
                    <Input type="date" />
                 </div>
              </div>

              <div className="border rounded-lg p-4 bg-card space-y-4">
                 <h3 className="font-semibold text-sm">SEO & Social</h3>
                 <div className="aspect-video bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <div className="text-center space-y-2">
                       <Eye className="h-6 w-6 mx-auto text-muted-foreground" />
                       <span className="text-xs text-muted-foreground">Upload OG Image</span>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Meta Description</label>
                    <Input placeholder="Brief summary for search engines..." />
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
