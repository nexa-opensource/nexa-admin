import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, MoreHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Author } from "./types";

interface GeneralSettingsProps {
  slug: string;
  setSlug: (slug: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  author: Author;
  setAuthor: (author: Author) => void;
  allAuthors: Author[];
}

export function GeneralSettings({
  slug,
  setSlug,
  excerpt,
  setExcerpt,
  author,
  setAuthor,
  allAuthors,
}: GeneralSettingsProps) {
  const [openAuthorSelect, setOpenAuthorSelect] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
        <Globe className="h-4 w-4" /> General
      </h3>
      <div className="space-y-4 bg-muted/10">
        <div className="grid gap-2">
          <Label>URL Slug</Label>
          <div className="flex">
            <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
              /blog/
            </span>
            <Input
              value={slug}
              onChange={(e) =>
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, "-")
                    .replace(/-+/g, "-")
                    .replace(/^-|-$/g, ""),
                )
              }
              className="rounded-l-none font-mono text-sm"
              placeholder="post-url-slug"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Author</Label>
          <Popover open={openAuthorSelect} onOpenChange={setOpenAuthorSelect}>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
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
                    <span className="text-muted-foreground">{author.role}</span>
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
                            <span className="font-medium">{a.name}</span>
                            <span className="text-muted-foreground">
                              {a.role}
                            </span>
                          </div>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            author.id === a.id ? "opacity-100" : "opacity-0",
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
  );
}
