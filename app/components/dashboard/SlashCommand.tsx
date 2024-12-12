import {
    CheckSquare,
    Code,
    FileImage,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    Ruler,
    Strikethrough,
    Text,
    TextQuote,
    Video,
} from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";

export const suggestionItems = createSuggestionItems([
    {
        title: "Text",
        description: "Just start typing a text.",
        searchTerms: ["p", "paragraph"],
        icon: <Text size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode("paragraph", "paragraph")
                .run();
        },
    },
    {
        title: "To-do List",
        description: "Track with a to-do list.",
        searchTerms: ["todo", "task", "list", "check", "checkbox"],
        icon: <CheckSquare size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
    },
    {
        title: "Heading 1",
        description: "Big section heading.",
        searchTerms: ["title", "big", "large"],
        icon: <Heading1 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 1 })
                .run();
        },
    },
    {
        title: "Heading 2",
        description: "Medium section heading.",
        searchTerms: ["subtitle", "medium"],
        icon: <Heading2 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 2 })
                .run();
        },
    },
    {
        title: "Heading 3",
        description: "Small section heading.",
        searchTerms: ["subtitle", "small"],
        icon: <Heading3 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 3 })
                .run();
        },
    },
    {
        title: "Bullet List",
        description: "Create a bullet list.",
        searchTerms: ["unordered", "point"],
        icon: <List size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
    },
    {
        title: "Numbered List",
        description: "Create a numbered list.",
        searchTerms: ["ordered"],
        icon: <ListOrdered size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
    },
    {
        title: "Quote",
        description: "Capture a quote.",
        searchTerms: ["blockquote"],
        icon: <TextQuote size={18} />,
        command: ({ editor, range }) =>
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode("paragraph", "paragraph")
                .toggleBlockquote()
                .run(),
    },
    {
        title: "Code",
        description: "Capture a code snippet.",
        searchTerms: ["codeblock"],
        icon: <Code size={18} />,
        command: ({ editor, range }) =>
            editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
        title: "Image",
        description: "Insert an image from a URL.",
        searchTerms: ["image", "photo", "picture", "media"],
        icon: <FileImage size={18} />,
        command: ({ editor, range }) => {
            const url = prompt("Enter Image URL:");
            if (url) {
                editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
            }
        },
    },
    {
        title: "YouTube Video",
        description: "Embed a YouTube video.",
        searchTerms: ["youtube", "video", "embed"],
        icon: <Video size={18} />,  // Use the Video icon from lucide-react
        command: ({ editor, range }) => {
            const url = prompt("Enter YouTube URL:");
            if (url) {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setYoutubeVideo({ src: url })  // Tiptap's setYoutubeVideo command
                    .run();
            }
        },
    },
    {
        title: "Strike",
        description: "Strike through the text.",
        searchTerms: ["strikethrough"],
        icon: <Strikethrough size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleStrike().run();
        },
    },
    {
        title: "Italic",
        description: "Italicize selected text.",
        searchTerms: ["italic"],
        icon: <Italic size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleItalic().run();
        },
    },
    {
        title: "Horizontal Line",
        description: "Insert a horizontal rule.",
        searchTerms: ["line", "rule", "separator"],
        icon: <Ruler size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
    },

]);

export const slashCommand = Command.configure({
    suggestion: {
        items: () => suggestionItems,
        render: renderItems,
    },
});
