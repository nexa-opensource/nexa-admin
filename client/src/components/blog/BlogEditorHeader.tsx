import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BarChart2,
  TrendingUp,
  Settings,
  Eye,
  EyeOff,
  Save,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";

interface BlogEditorHeaderProps {
  status: "published" | "draft" | "review";
  isNew: boolean;
  onSave: (status?: "published" | "draft") => void;
  onSettingsClick: () => void;
  isSaving?: boolean;
  isPreview?: boolean;
  onPreviewToggle?: () => void;
}

export function BlogEditorHeader({
  status,
  isNew,
  onSave,
  onSettingsClick,
  isSaving,
  isPreview,
  onPreviewToggle,
}: BlogEditorHeaderProps) {
  const [, setLocation] = useLocation();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-background/80 backdrop-blur top-0 z-20">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/content/blog")}
          className="gap-2 text-muted-foreground hover:text-foreground pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Posts
        </Button>
        <div className="h-4 w-px bg-border hidden sm:block" />
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 border text-xs font-mono">
            {status === "published" ? (
              <span className="flex items-center gap-1.5 text-emerald-600">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
                Published
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-600">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Draft
              </span>
            )}
            {isSaving && (
              <span className="ml-2 text-muted-foreground animate-pulse">
                Saving...
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
              Analytics
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <DropdownMenuLabel className="p-4 border-b bg-muted/20">
              Post Performance
              <span className="block text-xs font-normal text-muted-foreground mt-1">
                Last 30 days
              </span>
            </DropdownMenuLabel>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="space-y-1 p-3 rounded-lg bg-muted/30">
                <span className="text-xs text-muted-foreground">
                  Total Views
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">1,245</span>
                  <span className="text-xs text-emerald-500 flex items-center bg-emerald-500/10 px-1 rounded">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> 12%
                  </span>
                </div>
              </div>
              <div className="space-y-1 p-3 rounded-lg bg-muted/30">
                <span className="text-xs text-muted-foreground">
                  Avg. Read Time
                </span>
                <div className="text-xl font-bold">4m 12s</div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          title="Settings"
          onClick={onSettingsClick}
        >
          <Settings className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          title={isPreview ? "Unknown" : "Preview"}
          onClick={onPreviewToggle}
          className={isPreview ? "bg-muted text-foreground" : ""}
        >
          {isPreview ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        <div className="h-4 w-px bg-border" />
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => onSave("draft")}
          disabled={status === "published" && !isNew} // Example logic: if published, maybe "Save Draft" isn't the primary action
        >
          <Save className="h-4 w-4" /> Save Draft
        </Button>
        <Button
          className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          onClick={() => onSave("published")}
        >
          {status === "published" ? "Update" : "Publish"}{" "}
          <Sparkles className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </header>
  );
}
