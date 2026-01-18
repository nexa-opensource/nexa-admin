import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { GeneralSettings } from "./settings/GeneralSettings";
import { MediaSettings } from "./settings/MediaSettings";
import { CommentsSection } from "./settings/CommentsSection";
import { TagSettings } from "./settings/TagSettings";
import { Author, Comment } from "./settings/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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
  tags: string[];
  setTags: (tags: string[]) => void;
  author: Author;
  setAuthor: (author: Author) => void;
  allAuthors: Author[];
  comments: Comment[];
  onDelete: () => void;
  onAddComment: (content: string, author: Author) => void;
  onDeleteComment: (id: string) => void;
  onLikeComment: (id: string) => void;
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
  tags,
  setTags,
  author,
  setAuthor,
  allAuthors,
  comments,
  onDelete,
  onAddComment,
  onDeleteComment,
  onLikeComment,
}: BlogSettingsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col p-0 gap-0">
        <SheetHeader className="p-6 pb-2 border-b">
          <SheetTitle>Post Settings</SheetTitle>
          <SheetDescription>
            Configure metadata, SEO, and manage comments.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="settings" className="flex-1 flex flex-col w-full">
          <div className="px-6 py-4 border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                Comments
                <Badge variant="secondary" className="px-1.5 h-5 text-[10px]">
                  {comments.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="settings"
            className="flex-1 p-0 m-0 relative focus-visible:ring-0 outline-none"
          >
            <ScrollArea className="h-[calc(100vh-11rem)]">
              <div className="space-y-8 p-6 pb-12">
                <GeneralSettings
                  slug={slug}
                  setSlug={setSlug}
                  excerpt={excerpt}
                  setExcerpt={setExcerpt}
                  author={author}
                  setAuthor={setAuthor}
                  allAuthors={allAuthors}
                />

                <Separator />

                <TagSettings tags={tags} setTags={setTags} />

                <Separator />

                <MediaSettings
                  coverImage={coverImage}
                  setCoverImage={setCoverImage}
                />

                <Separator />

                <div className="pt-2 flex justify-between">
                  <Button
                    variant="secondary"
                    className="w-full border-destructive/50 hover:bg-destructive/10 text-destructive"
                    onClick={onDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Post
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent
            value="comments"
            className="flex-1 p-0 m-0 relative focus-visible:ring-0 outline-none"
          >
            <ScrollArea className="h-[calc(100vh-11rem)]">
              <div className="p-6">
                <CommentsSection
                  comments={comments}
                  onAddComment={onAddComment}
                  onDeleteComment={onDeleteComment}
                  onLikeComment={onLikeComment}
                  allAuthors={allAuthors}
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
