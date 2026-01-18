import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Globe,
  MessageSquare,
  ImageIcon,
  UploadCloud,
  Trash2,
  MoreHorizontal,
  Check,
  ThumbsUp,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

interface BlogSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  slug: string;
  setSlug: (slug: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  coverImage: string;
  setCoverImage: (url: string) => void;
  author: Author;
  setAuthor: (author: Author) => void;
  allAuthors: Author[];
  comments: Comment[];
  onDelete: () => void;
}

export function BlogSettingsSheet({
  open,
  onOpenChange,
  slug,
  setSlug,
  excerpt,
  setExcerpt,
  coverImage,
  setCoverImage,
  author,
  setAuthor,
  allAuthors,
  comments,
  onDelete,
}: BlogSettingsSheetProps) {
  const [openAuthorSelect, setOpenAuthorSelect] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Post Settings</SheetTitle>
          <SheetDescription>
            Configure metadata, SEO, and publishing options.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] -mr-6 pr-6 mt-6">
          <div className="space-y-8 pb-10">
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                <Globe className="h-4 w-4" /> General
              </h3>
              <div className="space-y-4 rounded-xl border p-4 bg-muted/10">
                <div className="grid gap-2">
                  <Label>URL Slug</Label>
                  <div className="flex">
                    <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
                      /blog/
                    </span>
                    <Input
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="rounded-l-none font-mono text-sm"
                      placeholder="post-url-slug"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Author</Label>
                  <Popover
                    open={openAuthorSelect}
                    onOpenChange={setOpenAuthorSelect}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openAuthorSelect}
                        className="w-full justify-between h-auto py-2"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={author.avatar} />
                            <AvatarFallback>{author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start text-xs">
                            <span className="font-medium">{author.name}</span>
                            <span className="text-muted-foreground">
                              {author.role}
                            </span>
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
                            {allAuthors.map((a) => (
                              <CommandItem
                                key={a.id}
                                value={a.name}
                                onSelect={() => {
                                  setAuthor(a);
                                  setOpenAuthorSelect(false);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={a.avatar} />
                                    <AvatarFallback>{a.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col items-start text-xs">
                                    <span className="font-medium">
                                      {a.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {a.role}
                                    </span>
                                  </div>
                                </div>
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    author.id === a.id
                                      ? "opacity-100"
                                      : "opacity-0",
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
                  <Label className="flex justify-between">
                    Short Description
                    <span
                      className={cn(
                        "text-xs",
                        excerpt.length > 160
                          ? "text-destructive"
                          : "text-muted-foreground",
                      )}
                    >
                      {excerpt.length}/160
                    </span>
                  </Label>
                  <Textarea
                    className="resize-none h-24 bg-background"
                    placeholder="Brief summary shown on blog cards..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                <MessageSquare className="h-4 w-4" /> Comments
              </h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-3 text-sm border rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{comment.content}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:text-primary"
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {comment.likes}
                        </span>
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
                  <img
                    src={coverImage}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                    alt="Cover"
                  />
                  <div className="relative z-10 flex flex-col items-center gap-2 bg-background/80 p-4 rounded-lg backdrop-blur-sm shadow-sm transition-transform group-hover:scale-110">
                    <UploadCloud className="h-8 w-8 text-primary" />
                    <span className="text-xs text-foreground font-medium">
                      Click to replace
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button
                variant="outline"
                className="border-destructive/50 hover:bg-destructive/10 text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Post
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
