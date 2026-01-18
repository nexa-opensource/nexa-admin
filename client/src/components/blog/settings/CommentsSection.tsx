import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  MoreHorizontal,
  Check,
  ThumbsUp,
  Trash2,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Author, Comment } from "./types";

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (content: string, author: Author) => void;
  onDeleteComment: (id: string) => void;
  onLikeComment: (id: string) => void;
  allAuthors: Author[];
}

export function CommentsSection({
  comments,
  onAddComment,
  onDeleteComment,
  onLikeComment,
  allAuthors,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [selectedCommentAuthor, setSelectedCommentAuthor] = useState<Author>(
    allAuthors[0],
  );
  const [openCommentAuthorSelect, setOpenCommentAuthorSelect] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment, selectedCommentAuthor);
    setNewComment("");
  };

  const handleConfirmDeleteComment = () => {
    if (commentToDelete) {
      onDeleteComment(commentToDelete);
      setCommentToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label>Add a comment</Label>
            <Popover
              open={openCommentAuthorSelect}
              onOpenChange={setOpenCommentAuthorSelect}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  role="combobox"
                  aria-expanded={openCommentAuthorSelect}
                  className="h-8 gap-2 -mr-2 text-muted-foreground hover:text-foreground"
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={selectedCommentAuthor.avatar} />
                    <AvatarFallback>
                      {selectedCommentAuthor.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs truncate max-w-[100px]">
                    {selectedCommentAuthor.name}
                  </span>
                  <MoreHorizontal className="h-3 w-3 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px] p-0" align="end">
                <Command>
                  <CommandInput
                    placeholder="Select user..."
                    className="h-8 text-xs"
                  />
                  <CommandList>
                    <CommandEmpty>No user found.</CommandEmpty>
                    <CommandGroup>
                      {allAuthors.map((a) => (
                        <CommandItem
                          key={a.id}
                          value={a.name}
                          onSelect={() => {
                            setSelectedCommentAuthor(a);
                            setOpenCommentAuthorSelect(false);
                          }}
                          className="text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={a.avatar} />
                              <AvatarFallback>{a.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{a.name}</span>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-3 w-3",
                              selectedCommentAuthor.id === a.id
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
          <div className="flex gap-2">
            <Textarea
              placeholder={`Write a comment as ${selectedCommentAuthor.name}...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none text-sm"
            />
          </div>
          <Button
            size="sm"
            className="self-end w-full sm:w-auto"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Post Comment
          </Button>
        </div>

        <div className="space-y-4 mt-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 text-sm border rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-colors group relative"
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
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {comment.content}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:text-primary"
                    onClick={() => onLikeComment(comment.id)}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {comment.likes}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setCommentToDelete(comment.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <AlertDialog
            open={!!commentToDelete}
            onOpenChange={(open) => !open && setCommentToDelete(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this comment.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmDeleteComment}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
