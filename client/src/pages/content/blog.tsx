import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOG_POSTS, BlogPost } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  BarChart2,
  Trash2,
  LayoutGrid,
  List as ListIcon,
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  FileText,
  UploadCloud,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLocation } from "wouter";

export default function BlogPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  const handleEdit = (id?: string) => {
    setLocation(id ? `/content/blog/${id}` : "/content/blog/new");
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
    toast({
      title: "Deleted",
      description: "Post has been removed permanently",
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <AdminLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key="list-view"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-6 h-full flex flex-col"
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background/50 backdrop-blur-sm p-1 rounded-xl">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                Blog Posts{" "}
                <Badge variant="secondary" className="text-xs font-normal">
                  {posts.length}
                </Badge>
              </h1>
              <p className="text-muted-foreground">
                Manage your articles, tutorials, and announcements.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="hidden sm:flex"
                onClick={() =>
                  toast({
                    title: "Coming Soon",
                    description: "Import feature is under development.",
                  })
                }
              >
                <UploadCloud className="mr-2 h-4 w-4" /> Import
              </Button>
              <Button
                onClick={() => handleEdit()}
                className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Button>
            </div>
          </div>

          {/* Filters Toolbar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-2 rounded-lg border shadow-sm sticky top-0 z-10">
            <div className="relative flex-1 w-full sm:max-w-xs transition-all focus-within:max-w-sm focus-within:ring-2 ring-primary/20 rounded-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-9 bg-background border-none shadow-none focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="h-6 w-px bg-border hidden sm:block" />

            <Tabs
              defaultValue="all"
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-transparent p-0 gap-1">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-md px-3"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="published"
                  className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-600 rounded-md px-3"
                >
                  Published
                </TabsTrigger>
                <TabsTrigger
                  value="draft"
                  className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600 rounded-md px-3"
                >
                  Drafts
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-1 ml-auto">
              <div className="bg-muted p-1 rounded-md flex">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLayoutMode("grid")}
                  className={cn(
                    "h-7 w-7 p-0 rounded-sm hover:bg-background",
                    layoutMode === "grid" && "bg-background shadow-sm",
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLayoutMode("list")}
                  className={cn(
                    "h-7 w-7 p-0 rounded-sm hover:bg-background",
                    layoutMode === "list" && "bg-background shadow-sm",
                  )}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Posts Grid/List */}
          {filteredPosts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className={cn(
                "grid gap-6 pb-8",
                layoutMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                  : "grid-cols-1",
              )}
            >
              {filteredPosts.map((post) => (
                <motion.div
                  variants={itemVariants}
                  key={post.id}
                  layoutId={post.id}
                >
                  <Card
                    className={cn(
                      "group cursor-pointer border-border/60 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 flex overflow-hidden bg-card/50 backdrop-blur-sm",
                      layoutMode === "grid"
                        ? "flex-col h-full"
                        : "flex-row h-48",
                    )}
                    onClick={() => handleEdit(post.id)}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden bg-muted",
                        layoutMode === "grid"
                          ? "aspect-[16/9] w-full"
                          : "w-1/3 h-full",
                      )}
                    >
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge
                          className={cn(
                            "shadow-sm backdrop-blur-md border-none",
                            post.status === "published"
                              ? "bg-emerald-500/90 hover:bg-emerald-500"
                              : "bg-amber-500/90 hover:bg-amber-500",
                          )}
                        >
                          {post.status === "published" ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      {layoutMode === "grid" && (
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 text-xs backdrop-blur-md bg-white/20 hover:bg-white/40 border-none text-white"
                          >
                            Quick Edit <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <CardHeader
                        className={cn(
                          "space-y-2",
                          layoutMode === "list" ? "p-4 pb-2" : "p-5 pb-2",
                        )}
                      >
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
                              />
                              <AvatarFallback>{post.author[0]}</AvatarFallback>
                            </Avatar>
                            {post.author}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {post.publishedAt}
                          </span>
                        </div>
                        <CardTitle
                          className={cn(
                            "line-clamp-2 group-hover:text-primary transition-colors",
                            layoutMode === "grid" ? "text-xl" : "text-lg",
                          )}
                        >
                          {post.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent
                        className={cn(
                          "flex-1",
                          layoutMode === "list" ? "p-4 py-2" : "p-5 py-0",
                        )}
                      >
                        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                        {layoutMode === "list" && (
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />{" "}
                              {post.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" /> {post.readTime}
                            </span>
                          </div>
                        )}
                        {layoutMode === "grid" && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs font-normal text-muted-foreground group-hover:border-primary/30 transition-colors bg-muted/50"
                              >
                                #{tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs font-normal text-muted-foreground"
                              >
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>

                      {layoutMode === "grid" && (
                        <CardFooter className="p-5 pt-0 border-t border-border/40 mt-auto flex items-center justify-between text-xs text-muted-foreground bg-muted/5 h-12">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex items-center gap-1"
                              title="Views"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div
                              className="flex items-center gap-1"
                              title="Read time"
                            >
                              <Clock className="h-3.5 w-3.5" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 -mr-2 bg-transparent hover:bg-background/80"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(post.id);
                                }}
                              >
                                <FileText className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => e.stopPropagation()}
                              >
                                <BarChart2 className="mr-2 h-4 w-4" /> Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Share2 className="mr-2 h-4 w-4" /> Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(post.id);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl bg-muted/30"
            >
              <div className="bg-muted p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No posts found</h3>
              <p className="text-muted-foreground text-sm max-w-xs text-center mt-1">
                We couldn't find any posts matching your search filters. Try
                refreshing or create a new post.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </AdminLayout>
  );
}
