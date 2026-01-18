import { Button } from "@/components/ui/button";
import { 
  Bold, Italic, Underline, Strikethrough, 
  Link as LinkIcon, List, ListOrdered, CheckSquare, 
  Image as ImageIcon, Code, Quote, 
  Heading1, Heading2, Heading3, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Undo, Redo, Eraser, Highlighter, Subscript, Superscript
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RichTextEditorProps {
  className?: string;
  minHeight?: string;
}

export function RichTextEditor({ className, minHeight = "min-h-[400px]" }: RichTextEditorProps) {
  const ToolbarButton = ({ icon: Icon, label, isActive = false }: { icon: any, label: string, isActive?: boolean }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-8 w-8 text-muted-foreground hover:text-foreground",
            isActive && "bg-muted text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className={cn("flex flex-col w-full border rounded-lg bg-background overflow-hidden", className)}>
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/20 sticky top-0 z-10 backdrop-blur-sm">
        
        {/* History */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton icon={Undo} label="Undo" />
          <ToolbarButton icon={Redo} label="Redo" />
        </div>
        
        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headings */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton icon={Heading1} label="Heading 1" />
          <ToolbarButton icon={Heading2} label="Heading 2" />
          <ToolbarButton icon={Heading3} label="Heading 3" />
        </div>
        
        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Basic Formatting */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton icon={Bold} label="Bold" isActive />
          <ToolbarButton icon={Italic} label="Italic" />
          <ToolbarButton icon={Underline} label="Underline" />
          <ToolbarButton icon={Strikethrough} label="Strikethrough" />
          <ToolbarButton icon={Highlighter} label="Highlight" />
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Alignment */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton icon={AlignLeft} label="Align Left" isActive />
          <ToolbarButton icon={AlignCenter} label="Align Center" />
          <ToolbarButton icon={AlignRight} label="Align Right" />
          <ToolbarButton icon={AlignJustify} label="Justify" />
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton icon={List} label="Bullet List" />
          <ToolbarButton icon={ListOrdered} label="Numbered List" />
          <ToolbarButton icon={CheckSquare} label="Task List" />
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Insert */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton icon={LinkIcon} label="Insert Link" />
          <ToolbarButton icon={ImageIcon} label="Insert Image" />
          <ToolbarButton icon={Quote} label="Blockquote" />
          <ToolbarButton icon={Code} label="Code Block" />
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Clear */}
        <div className="flex items-center gap-0.5 ml-auto">
          <ToolbarButton icon={Eraser} label="Clear Formatting" />
        </div>
      </div>
      
      <div className={cn("p-6 prose prose-neutral dark:prose-invert max-w-none focus:outline-none bg-background", minHeight)}>
        <p className="lead">Portal is a comprehensive documentation and content management system designed for modern engineering teams.</p>
        
        <h2>Why Portal?</h2>
        <p>It includes features like:</p>
        <ul>
          <li><strong>Rich text editing</strong> with advanced formatting</li>
          <li>Component registry management</li>
          <li>Theme customization</li>
        </ul>
        
        <blockquote>
          "The best documentation tool we've ever used. It's intuitive, fast, and beautiful."
        </blockquote>

        <h3>Installation</h3>
        <p>Getting started is easy. Just run the initialization command:</p>
        <pre><code className="language-bash">npx create-portal-app@latest</code></pre>
        
        <p>Start building your next great idea today with our powerful tools and flexible API.</p>
      </div>
      
      <div className="border-t p-2 px-4 text-xs text-muted-foreground flex justify-between bg-muted/10">
        <div className="flex gap-4">
          <span>Words: 42</span>
          <span>Characters: 286</span>
        </div>
        <div>
          Last saved: Just now
        </div>
      </div>
    </div>
  );
}
