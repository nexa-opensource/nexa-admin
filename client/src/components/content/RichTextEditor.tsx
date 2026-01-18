import { Button } from "@/components/ui/button";
import { Bold, Italic, Link as LinkIcon, List, ListOrdered, Image as ImageIcon, Code, Quote, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  className?: string;
  minHeight?: string;
}

export function RichTextEditor({ className, minHeight = "min-h-[400px]" }: RichTextEditorProps) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Heading2 className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="h-6 mx-1" />

        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Quote className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Code className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className={cn("p-4 prose prose-neutral dark:prose-invert max-w-none focus:outline-none", minHeight)}>
        <p className="lead">Portal is a comprehensive documentation and content management system designed for modern engineering teams.</p>
        <p>It includes features like:</p>
        <ul>
          <li>Rich text editing</li>
          <li>Component registry management</li>
          <li>Theme customization</li>
        </ul>
        <h3>Installation</h3>
        <pre><code>npx create-portal-app@latest</code></pre>
        <p>Start building your next great idea today with our powerful tools and flexible API.</p>
      </div>
    </div>
  );
}
