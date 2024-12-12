import { type JSONContent } from "novel";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import BlockQuote from '@tiptap/extension-blockquote';
import Code from '@tiptap/extension-code';
import TextStyle from '@tiptap/extension-text-style';
import CodeBlock from '@tiptap/extension-code-block';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Bold from '@tiptap/extension-bold';
import Image from '@tiptap/extension-image';
import OrderedList from '@tiptap/extension-ordered-list';
import HardBreak from '@tiptap/extension-hard-break';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import YouTube from '@tiptap/extension-youtube';
import Strike from '@tiptap/extension-strike';
import Placeholder from '@tiptap/extension-placeholder';
import Italic from '@tiptap/extension-italic';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Dropcursor from '@tiptap/extension-dropcursor';
import FloatingMenu from '@tiptap/extension-floating-menu';
import Gapcursor from '@tiptap/extension-gapcursor';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';

export function RenderArticle({ json }: { json: JSONContent; }) {
    const jsonOutPut = useMemo(() => {
        return generateHTML(json, [
            Document,
            Paragraph,
            Text,
            Link,
            Underline,
            Heading,
            ListItem,
            BulletList,
            BlockQuote,
            Code,
            TextStyle,
            CodeBlock,
            TaskList,
            TaskItem,
            Bold,
            Image,
            OrderedList,
            HardBreak,
            BubbleMenu,
            CharacterCount,
            Color,
            YouTube.configure({
                controls: true,
                nocookie: true,
            }),
            Strike,
            Placeholder,
            Italic,
            CodeBlockLowlight,
            Dropcursor,
            FloatingMenu,
            Gapcursor,
            Highlight,
            History,
            HorizontalRule,
        ]);
    }, [json]);

    return (
        <div
            className="prose m-auto w-11/12 sm:prose-lg dark:prose-invert sm:w-2/3 prose-li:marker:text-primary list-none"
            dangerouslySetInnerHTML={{ __html: jsonOutPut }}
        />
    );
}