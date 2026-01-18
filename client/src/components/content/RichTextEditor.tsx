import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import AutoJoiner from "tiptap-extension-auto-joiner";
import { Color } from "@tiptap/extension-color";
import { TextStyle, LineHeight, FontSize } from "@tiptap/extension-text-style";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  FileCode,
  Minus,
  Undo,
  Redo,
  Palette,
  Type,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export interface RichTextEditorProps {
  className?: string;
  minHeight?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  className,
  minHeight = "min-h-[400px]",
  value = "",
  onChange,
  placeholder = "Start writing your story...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border shadow-sm max-w-full my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "is-editor-empty before:content-[attr(data-placeholder)] before:text-muted-foreground/50 before:float-left before:h-0 before:pointer-events-none",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      GlobalDragHandle.configure({
        dragHandleWidth: 20,
        scrollTreshold: 100,
      }),
      AutoJoiner,
      CharacterCount,
      TextStyle,
      Color,
      FontSize,
      LineHeight.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[inherit] p-4",
          minHeight,
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Update content if value changes externally (e.g. loaded from backend)
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      // Only set content if it's different to prevent cursor jumping
      // Simple check, could be improved with a diff
      const currentContent = editor.getHTML();
      if (Math.abs(currentContent.length - value.length) > 5) {
        // Threshold for minor diffs
        editor.commands.setContent(value);
      }
    }
  }, [value, editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return <div className="p-4 border rounded-md">Loading editor...</div>;
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    icon: Icon,
    disabled = false,
  }: {
    onClick: () => void;
    isActive?: boolean;
    icon: any;
    disabled?: boolean;
  }) => (
    <Toggle
      size="sm"
      pressed={isActive}
      onPressedChange={onClick}
      disabled={disabled}
      className={cn(
        "h-8 w-8 p-0 data-[state=on]:bg-muted data-[state=on]:text-foreground",
        isActive && "bg-muted text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
    </Toggle>
  );

  return (
    <div className={cn("flex flex-col w-full group relative", className)}>
      {/* Main Toolbar - Visible on hover or focus mostly in a "zen" mode, but let's keep it sticky for now */}
      <div className="flex flex-wrap items-center gap-1 p-2 sticky top-0 bg-background/80 backdrop-blur-md border-b mb-4 transition-opacity duration-200 opacity-100">
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          icon={Heading1}
        />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          icon={Heading2}
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          icon={Bold}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          icon={Italic}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          icon={UnderlineIcon}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          icon={Code}
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        <div className="flex items-center gap-1.5 px-1">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors border border-transparent hover:border-input">
            <Palette className="h-4 w-4 absolute pointer-events-none text-foreground" />
            <input
              type="color"
              value={editor.getAttributes("textStyle").color || "#000000"}
              onInput={(e) =>
                editor
                  .chain()
                  .focus()
                  .setColor((e.target as HTMLInputElement).value)
                  .run()
              }
              className="opacity-0 w-full h-full cursor-pointer"
              title="Text Color"
            />
          </div>

          <div className="relative flex items-center">
            <Type className="h-3 w-3 absolute left-2 pointer-events-none text-muted-foreground" />
            <select
              className="h-8 w-20 pl-6 pr-2 text-xs bg-transparent border rounded-md focus:outline-none focus:ring-1 focus:ring-ring appearance-none cursor-pointer hover:bg-muted font-medium"
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  editor.chain().focus().setFontSize(value).run();
                } else {
                  editor.chain().focus().unsetFontSize().run();
                }
              }}
              value={
                editor.getAttributes("textStyle").fontSize
                  ? String(editor.getAttributes("textStyle").fontSize).replace(
                      "px",
                      "",
                    )
                  : ""
              }
              title="Font Size"
            >
              <option value="">Auto</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="24">24</option>
              <option value="30">30</option>
              <option value="36">36</option>
              <option value="48">48</option>
              <option value="64">64</option>
              <option value="72">72</option>
            </select>
          </div>

          <div className="relative flex items-center">
            <ArrowUpDown className="h-3 w-3 absolute left-2 pointer-events-none text-muted-foreground" />
            <select
              className="h-8 w-20 pl-6 pr-2 text-xs bg-transparent border rounded-md focus:outline-none focus:ring-1 focus:ring-ring appearance-none cursor-pointer hover:bg-muted font-medium"
              onChange={(e) => {
                editor.chain().focus().setLineHeight(e.target.value).run();
              }}
              title="Line Height"
            >
              <option value="1">1.0</option>
              <option value="1.15">1.15</option>
              <option value="1.5">1.5</option>
              <option value="2">2.0</option>
              <option value="2.5">2.5</option>
              <option value="3">3.0</option>
            </select>
          </div>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          icon={AlignLeft}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          icon={AlignCenter}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          icon={AlignRight}
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          icon={List}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          icon={ListOrdered}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          icon={Quote}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          isActive={false}
          icon={Minus}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          icon={FileCode}
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        <div className="flex items-center gap-0.5 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={addImage}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <EditorContent editor={editor} />

      <div className="text-xs text-muted-foreground mt-2 px-2 flex justify-end">
        {editor.storage.characterCount?.words?.() || 0} words
      </div>
    </div>
  );
}
