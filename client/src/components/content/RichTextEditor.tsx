import { Button } from "@/components/ui/button";
import { Bold, Italic, Link as LinkIcon, List, ListOrdered, Image as ImageIcon, Code, Quote } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function RichTextEditor() {
  return (
    <div className="border rounded-md bg-card shadow-sm">
      <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 min-h-[300px] prose prose-sm max-w-none dark:prose-invert focus:outline-none">
        <h2 className="mt-0">Getting Started with Portal</h2>
        <p>Portal is a comprehensive documentation and content management system designed for modern engineering teams.</p>
        <p>It includes features like:</p>
        <ul>
          <li>Rich text editing</li>
          <li>Component registry management</li>
          <li>Theme customization</li>
        </ul>
        <pre><code>npx create-portal-app@latest</code></pre>
      </div>
    </div>
  );
}
