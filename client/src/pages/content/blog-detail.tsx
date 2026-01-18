import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/content/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ImageIcon, Check } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRoute } from "wouter";
import { BLOG_POSTS } from "@/lib/mock-data";
import { BlogEditorHeader } from "@/components/blog/BlogEditorHeader";
import { BlogSettingsSheet } from "@/components/blog/BlogSettingsSheet";

// Mock data constants
const AUTHORS = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Lead Engineer",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Product Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    id: "3",
    name: "Alex Tech",
    role: "Developer Advocate",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "4",
    name: "Emily Writer",
    role: "Content Strategist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
];

const COMMENTS = [
  {
    id: "1",
    author: "Dev User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
    content: "Great article! The new features look amazing.",
    date: "2 hours ago",
    likes: 12,
  },
  {
    id: "2",
    author: "Frontend Fan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fan",
    content:
      "Can't wait to try the new components. Is there a migration guide?",
    date: "5 hours ago",
    likes: 8,
  },
  {
    id: "3",
    author: "React Lover",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=React",
    content: "This is exactly what we needed. Thanks for the hard work!",
    date: "1 day ago",
    likes: 24,
  },
];

export default function BlogDetailPage() {
  const { toast } = useToast();
  const [, params] = useRoute("/content/blog/:id");
  const id = params?.id;
  const isNew = id === "new";

  // State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState(""); // Lifted state for editor content
  const [status, setStatus] = useState<"published" | "draft" | "review">(
    "draft",
  );
  const [selectedAuthor, setSelectedAuthor] = useState(AUTHORS[0]);
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  );

  // UI State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  // Load data
  useEffect(() => {
    if (!isNew && id) {
      const post = BLOG_POSTS.find((p) => p.id === id);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt);
        setStatus(post.status);
        setCoverImage(post.coverImage);
        // NOTE: Mock data doesn't have content body, so we simulate it or leave empty
        setContent(
          post.content ||
            "<p>This is simulated content loaded from the backend...</p>",
        );
        const author =
          AUTHORS.find((a) => a.name === post.author) || AUTHORS[0];
        setSelectedAuthor(author);
      }
    }
  }, [id, isNew]);

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 800);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [title, content, slug, excerpt]);

  const handleSave = useCallback(
    (newStatus?: "published" | "draft") => {
      if (!title) {
        toast({
          title: "Validation Error",
          description: "Please enter a post title",
          variant: "destructive",
        });
        return;
      }

      if (newStatus) setStatus(newStatus);

      setIsSaving(true);

      // Simulate API call
      setTimeout(() => {
        setIsSaving(false);
        toast({
          title: isNew ? "Post Created" : "Post Updated",
          description: (
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>
                Successfully saved <strong>{title}</strong>
              </span>
            </div>
          ),
        });

        // Navigate or other actions could go here
      }, 800);
    },
    [title, isNew, toast],
  );

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      toast({
        title: "Deleted",
        description: "Post has been removed permanently",
      });
      // In real app, navigate back
      window.history.back();
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col h-[calc(100vh-4rem)] -m-6 bg-background/50"
      >
        <BlogEditorHeader
          status={status}
          isNew={isNew}
          onSave={handleSave}
          onSettingsClick={() => setIsSettingsOpen(true)}
          isSaving={isSaving}
          isPreview={isPreview}
          onPreviewToggle={() => setIsPreview(!isPreview)}
        />

        <BlogSettingsSheet
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          title={title}
          slug={slug}
          setSlug={setSlug}
          excerpt={excerpt}
          setExcerpt={setExcerpt}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          author={selectedAuthor}
          setAuthor={setSelectedAuthor}
          allAuthors={AUTHORS}
          comments={COMMENTS}
          onDelete={handleDelete}
        />

        <ScrollArea className="flex-1 bg-background" id="scroll-container">
          <div className="min-h-full">
            {/* Hero Section with Cover Image */}
            <div className="relative h-[45vh] w-full group overflow-hidden">
              <div className="absolute inset-0 bg-muted">
                <img
                  src={coverImage}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Cover"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

              {!isPreview && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsSettingsOpen(true)}
                  className="absolute top-6 right-6 bg-black/20 border-white/20 text-white hover:bg-white/20 backdrop-blur-md transition-all"
                >
                  <ImageIcon className="mr-2 h-4 w-4" /> Change Cover
                </Button>
              )}

              {/* Title & Authentic Meta Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 max-w-5xl mx-auto w-full z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 text-white/80 mb-4">
                    {status === "published" ? (
                      <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-xs font-medium border border-emerald-500/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
                        Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-xs font-medium border border-amber-500/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />{" "}
                        Draft
                      </span>
                    )}
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {selectedAuthor.role}
                    </span>
                  </div>

                  {isPreview ? (
                    <h1 className="w-full text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white px-0 py-2 leading-tight">
                      {title || "Untitled Post"}
                    </h1>
                  ) : (
                    <Textarea
                      className="w-full text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white border-none px-0 py-2 h-auto focus-visible:ring-0 placeholder:text-white/40 bg-transparent resize-none overflow-hidden min-h-[1.2em] leading-tight shadow-none"
                      placeholder="Type your title here..."
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      rows={1}
                    />
                  )}

                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pr-5">
                      <Avatar className="h-8 w-8 ring-1 ring-white/50">
                        <AvatarImage src={selectedAuthor.avatar} />
                        <AvatarFallback className="bg-primary/20 text-white">
                          {selectedAuthor.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">
                        {selectedAuthor.name}
                      </span>
                    </div>
                    <div className="flex flex-col text-xs text-white/60">
                      <span>Last edited</span>
                      <span>Just now</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full py-12 sm:py-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="prose-lg"
              >
                {isPreview ? (
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none p-4"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <RichTextEditor
                    minHeight="min-h-[60vh]"
                    className="border-none bg-transparent shadow-none px-0 text-lg leading-relaxed"
                    value={content}
                    onChange={setContent}
                    placeholder="Tell your story..."
                  />
                )}
              </motion.div>
            </div>
          </div>
        </ScrollArea>
      </motion.div>
    </AdminLayout>
  );
}
