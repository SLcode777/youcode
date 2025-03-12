import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type MarkdownProseProps = {
  markdown: string;
};

export const MarkdownProse = (props: MarkdownProseProps) => {
  return (
    <div className="prose dark:prose-invert lg:prose-lg">
      <Markdown remarkPlugins={[remarkGfm]}>{props.markdown}</Markdown>
    </div>
  );
};
