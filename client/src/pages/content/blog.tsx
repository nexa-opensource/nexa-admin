import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOG_POSTS, BlogPost } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, Calendar, Clock, ArrowRight, ArrowLeft, Save, Eye, Settings, Globe, Image as ImageIcon, Tag, Hash, Share2, UploadCloud, Heart, MessageSquare, BarChart2, TrendingUp, User, ThumbsUp, Send } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { RichTextEditor } from "@/components/content/RichTextEditor";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";

// Mock users for author selection
const AUTHORS = [
  { id: "1", name: "Sarah Chen", role: "Lead Engineer", avatar: "https://github.com/shadcn.png" },
  { id: "2", name: "Marcus Johnson", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
  { id: "3", name: "Alex Tech", role: "Developer Advocate", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { id: "4", name: "Emily Writer", role: "Content Strategist", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
];

// Mock comments
const COMMENTS = [
  { id: "1", author: "Dev User", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev", content: "Great article! The new features look amazing.", date: "2 hours ago", likes: 12 },
  { id: "2", author: "Frontend Fan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fan", content: "Can't wait to try the new components. Is there a migration guide?", date: "5 hours ago", likes: 8 },
  { id: "3", author: "React Lover", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=React", content: "This is exactly what we needed. Thanks for the hard work!", date: "1 day ago", likes: 24 },
];

export default function BlogPage() {
  const [view, setView] = useState<"list" | "edit">("list");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState(AUTHORS[0]);
  const [openAuthorSelect, setOpenAuthorSelect] = useState(false);

  const handleEdit = (post?: BlogPost) => {
    setSelectedPost(post || null);
    if (post) {
      // In a real app, you'd match the author ID
      const author = AUTHORS.find(a => a.name === post.author) || AUTHORS[0];
      setSelectedAuthor(author);
    }
    setView("edit");
  };

  return (
    <AdminLayout>
      {view === "list" ? (
        <div className="space-y-8 h-full flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
              <p className="text-muted-foreground">Manage your articles, tutorials, and announcements.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <UploadCloud className="mr-2 h-4 w-4" /> Import
              </Button>
              <Button onClick={() => handleEdit()}>
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4">
            <div className="relative flex-1 w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-9 bg-background" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
               <Tabs defaultValue="all" className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">All Posts</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                  </TabsList>
               </Tabs>
               <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
               </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-8">
            {BLOG_POSTS.map((post) => (
              <Card 
                key={post.id} 
                className="group cursor-pointer border-border/60 hover:border-primary/50 transition-all hover:shadow-md flex flex-col overflow-hidden"
                onClick={() => handleEdit(post)}
              >
                 <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3 flex gap-2">
                       <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="shadow-sm backdrop-blur-md">
                          {post.status}
                       </Badge>
                    </div>
                 </div>
                 
                 <CardHeader className="space-y-2 p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                       <span className="font-medium text-foreground">{post.author}</span>
                       <span>•</span>
                       <span>{post.publishedAt}</span>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                       {post.title}
                    </CardTitle>
                 </CardHeader>
                 
                 <CardContent className="p-5 pt-0 flex-1">
                    <p className="text-muted-foreground text-sm line-clamp-2">
                       {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                       {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground group-hover:border-primary/30 transition-colors">
                             #{tag}
                          </Badge>
                       ))}
                    </div>
                 </CardContent>

                 <CardFooter className="p-5 pt-0 border-t border-border/40 mt-auto flex items-center justify-between text-xs text-muted-foreground bg-muted/5">
                    <div className="flex items-center gap-4 py-3 w-full">
                       <div className="flex items-center gap-1 min-w-[3rem]" title="Views">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{post.views.toLocaleString()}</span>
                       </div>
                       <div className="flex items-center gap-1 min-w-[3rem]" title="Likes">
                          <Heart className="h-3.5 w-3.5" />
                          <span>{Math.floor(post.views * 0.15)}</span>
                       </div>
                       <div className="flex items-center gap-1 min-w-[3rem]" title="Comments">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>{Math.floor(post.views * 0.05)}</span>
                       </div>
                    </div>
                    <DropdownMenu>
                       <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                             <MoreHorizontal className="h-4 w-4" />
                          </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(post)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                       </DropdownMenuContent>
                    </DropdownMenu>
                 </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-4rem)] -m-6">
          {/* Editor Header */}
          <header className="flex items-center justify-between px-6 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setView("list")} className="gap-2 text-muted-foreground hover:text-foreground">
                   <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <div className="h-4 w-px bg-border hidden sm:block" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground hidden sm:flex">
                   <span className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      Unsaved changes
                   </span>
                </div>
             </div>
             
             <div className="flex items-center gap-2">
                {/* Analytics Popover */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                      Analytics
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0">
                    <DropdownMenuLabel className="p-4 border-b">
                      Post Performance
                      <span className="block text-xs font-normal text-muted-foreground mt-1">Last 30 days</span>
                    </DropdownMenuLabel>
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Total Views</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">1,245</span>
                          <span className="text-xs text-emerald-500 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-0.5" /> 12%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Avg. Read Time</span>
                        <div className="text-xl font-bold">4m 12s</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Likes</span>
                        <div className="text-xl font-bold">186</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Shares</span>
                        <div className="text-xl font-bold">42</div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Sheet>
                   <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                         <Settings className="h-4 w-4" />
                      </Button>
                   </SheetTrigger>
                   <SheetContent className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                         <SheetTitle>Post Settings</SheetTitle>
                         <SheetDescription>
                            Configure metadata, SEO, and publishing options.
                         </SheetDescription>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-10rem)] pr-4 mt-6">
                         <div className="space-y-8">
                            <div className="space-y-4">
                               <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                                  <Globe className="h-4 w-4" /> General
                               </h3>
                               <div className="space-y-3">
                                  <div className="grid gap-2">
                                     <Label>URL Slug</Label>
                                     <div className="flex">
                                        <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">/blog/</span>
                                        <Input defaultValue="introducing-shadcn-ui-kit-v2" className="rounded-l-none font-mono text-sm" />
                                     </div>
                                  </div>
                                  <div className="grid gap-2">
                                     <Label>Author</Label>
                                     <Popover open={openAuthorSelect} onOpenChange={setOpenAuthorSelect}>
                                        <PopoverTrigger asChild>
                                          <Button variant="outline" role="combobox" aria-expanded={openAuthorSelect} className="w-full justify-between h-auto py-2">
                                            <div className="flex items-center gap-2">
                                              <Avatar className="h-6 w-6">
                                                <AvatarImage src={selectedAuthor.avatar} />
                                                <AvatarFallback>{selectedAuthor.name[0]}</AvatarFallback>
                                              </Avatar>
                                              <div className="flex flex-col items-start text-xs">
                                                <span className="font-medium">{selectedAuthor.name}</span>
                                                <span className="text-muted-foreground">{selectedAuthor.role}</span>
                                              </div>
                                            </div>
                                            <MoreHorizontal className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                          <Command>
                                            <CommandInput placeholder="Search author..." />
                                            <CommandList>
                                              <CommandEmpty>No author found.</CommandEmpty>
                                              <CommandGroup>
                                                {AUTHORS.map((author) => (
                                                  <CommandItem
                                                    key={author.id}
                                                    value={author.name}
                                                    onSelect={() => {
                                                      setSelectedAuthor(author);
                                                      setOpenAuthorSelect(false);
                                                    }}
                                                  >
                                                    <div className="flex items-center gap-2">
                                                      <Avatar className="h-6 w-6">
                                                        <AvatarImage src={author.avatar} />
                                                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                                                      </Avatar>
                                                      <div className="flex flex-col items-start text-xs">
                                                        <span className="font-medium">{author.name}</span>
                                                        <span className="text-muted-foreground">{author.role}</span>
                                                      </div>
                                                    </div>
                                                    <Check
                                                      className={cn(
                                                        "ml-auto h-4 w-4",
                                                        selectedAuthor.id === author.id ? "opacity-100" : "opacity-0"
                                                      )}
                                                    />
                                                  </CommandItem>
                                                ))}
                                              </CommandGroup>
                                            </CommandList>
                                          </Command>
                                        </PopoverContent>
                                     </Popover>
                                  </div>
                                  <div className="grid gap-2">
                                     <Label>Short Description (Excerpt)</Label>
                                     <Textarea 
                                        className="resize-none h-24" 
                                        placeholder="Brief summary shown on blog cards..." 
                                        defaultValue={selectedPost?.excerpt || "We've rebuilt the entire library from the ground up. Better performance, more accessibility, and a brand new design system."} 
                                     />
                                     <p className="text-xs text-muted-foreground text-right">0/160 characters</p>
                                  </div>
                               </div>
                            </div>

                            <Separator />
                            
                            <div className="space-y-4">
                               <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                                  <MessageSquare className="h-4 w-4" /> Comments
                               </h3>
                               <div className="space-y-4">
                                  {COMMENTS.map((comment) => (
                                     <div key={comment.id} className="flex gap-3 text-sm border rounded-lg p-3 bg-muted/30">
                                        <Avatar className="h-8 w-8">
                                           <AvatarImage src={comment.avatar} />
                                           <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 flex-1">
                                           <div className="flex items-center justify-between">
                                              <span className="font-medium">{comment.author}</span>
                                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                                           </div>
                                           <p className="text-muted-foreground">{comment.content}</p>
                                           <div className="flex items-center gap-2 pt-1">
                                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                                 <ThumbsUp className="h-3 w-3" />
                                              </Button>
                                              <span className="text-xs text-muted-foreground">{comment.likes}</span>
                                           </div>
                                        </div>
                                     </div>
                                  ))}
                               </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                               <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                                  <ImageIcon className="h-4 w-4" /> Media
                               </h3>
                               <div className="grid gap-2">
                                  <Label>Cover Image</Label>
                                  <div className="aspect-video rounded-md border-2 border-dashed bg-muted flex flex-col items-center justify-center gap-2 hover:bg-muted/70 transition-colors cursor-pointer relative group overflow-hidden">
                                     <img src={selectedPost?.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40" />
                                     <div className="relative z-10 flex flex-col items-center gap-2">
                                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground font-medium">Click to upload or drag & drop</span>
                                     </div>
                                  </div>
                               </div>
                            </div>

                         </div>
                      </ScrollArea>
                   </SheetContent>
                </Sheet>
                <Button variant="ghost" size="icon">
                   <Eye className="h-4 w-4" />
                </Button>
                <div className="h-4 w-px bg-border" />
                <Button variant="outline" className="gap-2">
                   <Save className="h-4 w-4" /> Save
                </Button>
                <Button className="gap-2">
                   Publish
                </Button>
             </div>
          </header>
          
          <ScrollArea className="flex-1 bg-muted/10">
             <div className="max-w-4xl mx-auto py-12 px-6">
                
                {/* Editor Content */}
                <div className="space-y-8">
                   <div className="space-y-4">
                      <div className="group relative">
                         <div className="aspect-[21/9] rounded-xl overflow-hidden bg-muted border shadow-sm">
                            <img 
                               src={selectedPost?.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"} 
                               className="w-full h-full object-cover transition-opacity hover:opacity-90"
                            />
                         </div>
                         <Button variant="secondary" size="sm" className="absolute bottom-4 right-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <ImageIcon className="mr-2 h-4 w-4" /> Change Cover
                         </Button>
                      </div>

                      <div className="space-y-6 pt-4">
                         <Textarea 
                            placeholder="Post Title" 
                            className="text-4xl md:text-5xl font-extrabold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/30 min-h-[60px] resize-none overflow-hidden bg-transparent leading-tight tracking-tight" 
                            defaultValue={selectedPost?.title || "Introducing ShadcnUIKit V2"}
                         />
                         
                         <div className="flex items-center gap-3 text-sm text-muted-foreground border-b pb-8">
                            <Avatar className="h-8 w-8 ring-2 ring-background">
                               <AvatarImage src={selectedAuthor.avatar} />
                               <AvatarFallback>{selectedAuthor.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                               <span className="font-medium text-foreground">{selectedAuthor.name}</span>
                               <span className="hidden sm:inline">•</span>
                               <span>Published on {selectedPost?.publishedAt || "Jan 12, 2024"}</span>
                               <span className="hidden sm:inline">•</span>
                               <Badge variant="outline" className="font-normal text-xs rounded-full">
                                  {selectedPost?.tags?.[0] || "Release"}
                               </Badge>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="min-h-[500px]">
                      <RichTextEditor className="border-none shadow-none bg-transparent" minHeight="min-h-[60vh]" />
                   </div>
                </div>

             </div>
          </ScrollArea>
        </div>
      )}
    </AdminLayout>
  );
}
