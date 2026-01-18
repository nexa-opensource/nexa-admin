import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Hash, X, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock available tags - in a real app, this would come from an API or database
const AVAILABLE_TAGS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Web Development",
  "UI/UX",
  "CSS",
  "TailwindCSS",
  "Next.js",
  "Node.js",
  "API",
  "Tutorial",
  "Productivity",
  "Career",
];

interface TagSettingsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export function TagSettings({ tags, setTags }: TagSettingsProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSelectTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleCreateTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
        <Hash className="h-4 w-4" /> Tags
      </h3>
      <div className="grid gap-3 p-4 border rounded-xl bg-muted/10">
        <Label>Select Hashtags</Label>

        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="pl-2 pr-1 py-1 gap-1 text-xs hover:bg-secondary/80 transition-colors"
            >
              #{tag}
              <Button
                variant="ghost"
                size="icon"
                className="h-3 w-3 ml-1 hover:bg-muted rounded-full hover:text-destructive p-0"
                onClick={() => removeTag(tag)}
              >
                <X className="h-2 w-2" />
                <span className="sr-only">Remove {tag} tag</span>
              </Button>
            </Badge>
          ))}
          {tags.length === 0 && (
            <span className="text-xs text-muted-foreground italic py-1">
              No tags selected
            </span>
          )}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between text-muted-foreground font-normal"
            >
              {tags.length > 0
                ? `${tags.length} tag${tags.length > 1 ? "s" : ""} selected`
                : "Select tags..."}
              <Hash className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search tags..."
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateTag();
                  }
                }}
              />
              <CommandList>
                <CommandEmpty className="py-2 px-4 text-xs text-muted-foreground">
                  <p>No tags found.</p>
                  {inputValue && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 w-full justify-start h-8 text-xs"
                      onClick={handleCreateTag}
                    >
                      Create tag "{inputValue}"
                    </Button>
                  )}
                </CommandEmpty>
                <CommandGroup heading="Available Tags">
                  {AVAILABLE_TAGS.map((tag) => (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={() => handleSelectTag(tag)}
                      className="text-xs"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span>{tag}</span>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          tags.includes(tag) ? "opacity-100" : "opacity-0",
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
    </div>
  );
}
