import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOG_POSTS, BlogPost } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, Calendar, Clock, ArrowRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { RichTextEditor } from "@/components/content/RichTextEditor";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BlogPage() {
  const [view, setView] = useState<"list" | "edit">("list");
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);

  return (
    <AdminLayout>
      {view === "list" ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
              <p className="text-muted-foreground text-lg">Updates, tutorials, and insights from the team.</p>
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
            <div className="flex gap-2">
               <Button variant="secondary" size="sm" className="rounded-full px-4">All</Button>
               <Button variant="ghost" size="sm" className="rounded-full px-4">Release</Button>
               <Button variant="ghost" size="sm" className="rounded-full px-4">Tutorial</Button>
               <Button variant="ghost" size="sm" className="rounded-full px-4">Opinion</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col group cursor-pointer border-none shadow-none hover:shadow-lg transition-all duration-200">
                 <div className="aspect-[16/9] relative overflow-hidden rounded-xl mb-4">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                       {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">{tag}</Badge>
                       ))}
                    </div>
                 </div>
                 <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                       <Calendar className="h-3 w-3" />
                       <span>{post.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                       <Clock className="h-3 w-3" />
                       <span>{post.readTime}</span>
                    </div>
                 </div>
                 <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                 </h3>
                 <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                    {post.excerpt}
                 </p>
                 <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                       </Avatar>
                       <span className="text-xs font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                       Read more <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                 </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
             <Button variant="ghost" size="sm" onClick={() => setView("list")} className="-ml-2 text-muted-foreground hover:text-foreground">
                ← Back to Blog
             </Button>
             <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
                <Badge variant="outline" className="uppercase text-[10px]">Draft</Badge>
                <span className="text-xs">Saved 2m ago</span>
             </div>
          </div>
          
          <div className="space-y-4">
             <Input 
                placeholder="Post Title" 
                className="text-4xl font-extrabold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/30 h-auto py-2 tracking-tight" 
             />
             <div className="flex items-center gap-4 border-b pb-6">
                <Avatar className="h-8 w-8">
                   <AvatarImage src="https://github.com/shadcn.png" />
                   <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-xs">
                   <span className="font-semibold">Sarah Chen</span>
                   <span className="text-muted-foreground">Lead Engineer • Jan 12, 2024</span>
                </div>
                <div className="ml-auto flex gap-2">
                   <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                   </Button>
                   <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                   </Button>
                   <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                   </Button>
                </div>
             </div>
          </div>
          
          <div className="aspect-[21/9] bg-muted rounded-lg border-2 border-dashed flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-50 group-hover:opacity-40 transition-opacity"></div>
              <Button variant="secondary" className="relative z-10 shadow-lg">Change Cover Image</Button>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
             <RichTextEditor />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
