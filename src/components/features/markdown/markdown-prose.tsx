"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProseProps {
  markdown: string;
}
export const MarkdownProse = ({ markdown }: MarkdownProseProps) => {
  return (
    <div className="prose">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>;
    </div>
  );
};
