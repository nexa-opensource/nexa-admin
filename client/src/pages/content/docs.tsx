import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DOCS_ITEMS, DocItem } from "@/lib/mock-data";
import {
  Search,
  Plus,
  FileText,
  ChevronRight,
  Folder,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { RichTextEditor } from "@/components/content/RichTextEditor";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(DOCS_ITEMS[0]);
  const [items, setItems] = useState<DocItem[]>(DOCS_ITEMS);

  // Group items by category
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, DocItem[]>,
  );

  return (
    <AdminLayout>
      <div className="grid grid-cols-12 h-[calc(100vh-8rem)] gap-6">
        {/* Sidebar */}
        <div className="col-span-3 flex flex-col border rounded-lg bg-card overflow-hidden">
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Documentation</span>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Filter..." className="h-8 pl-8 text-xs" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {Object.entries(groupedItems).map(([category, docs]) => (
              <div key={category} className="mb-4">
                <h3 className="px-2 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {category}
                </h3>
                <div className="space-y-0.5">
                  {docs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc)}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-colors group",
                        selectedDoc?.id === doc.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{doc.title}</span>
                      </div>
                      {selectedDoc?.id === doc.id && (
                        <ChevronRight className="h-3 w-3 opacity-50" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="col-span-9 flex flex-col gap-6 overflow-hidden">
          {selectedDoc ? (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {selectedDoc.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      {selectedDoc.category}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-xs">
                      {selectedDoc.slug}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary">Preview</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <RichTextEditor />

                <div className="mt-8 border-t pt-6">
                  <h3 className="text-sm font-medium mb-4">Page Settings</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        SEO Title
                      </label>
                      <Input defaultValue={selectedDoc.title} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        URL Slug
                      </label>
                      <Input defaultValue={selectedDoc.slug} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Select a page to edit</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
