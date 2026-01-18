import { Label } from "@/components/ui/label";
import { UploadCloud, ImageIcon } from "lucide-react";
import { useRef } from "react";

interface MediaSettingsProps {
  coverImage: string;
  setCoverImage: (url: string) => void;
}

export function MediaSettings({
  coverImage,
  setCoverImage,
}: MediaSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
        <ImageIcon className="h-4 w-4" /> Media
      </h3>
      <div className="grid gap-2">
        <Label>Cover Image</Label>
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={handleKeyDown}
          className="aspect-video rounded-md border-2 border-dashed bg-muted flex flex-col items-center justify-center gap-2 hover:bg-muted/70 transition-colors cursor-pointer relative group overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
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
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            aria-label="Upload cover image"
          />
        </div>
      </div>
    </div>
  );
}
