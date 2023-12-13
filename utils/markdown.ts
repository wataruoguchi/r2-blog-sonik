// import hljs from "highlight.js";
import { Marked } from "marked";
import { markedEmoji } from "marked-emoji";
import { markedHighlight } from "marked-highlight";
import { frontmatter } from "./front-matter";
import { emojilibToDict } from "./gen-emojis";

type MarkdownMeta = {
  title: string;
  tags: string[];
  description?: string;
  bannerCredit?: string;
  bannerUrl?: string;
};
export type MarkdownMetaWithDate = MarkdownMeta & {
  createdDate: string;
  updatedDate: string;
};
export type MarkdownParsed = {
  content: string;
} & MarkdownMeta;

export function parseMd(markdown: string): MarkdownParsed {
  const marked = new Marked(
    markedHighlight({
      langPrefix: "language-",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      highlight(code: string, _lang: string) {
        return code;
      },
    }),
  );
  marked.use(markedEmoji({ emojis: emojilibToDict(), unicode: true }));

  const { head, body } = frontmatter(markdown);
  const rest = head
    .split("\n")
    .map((line) => line.split(": "))
    .reduce((acc, keyValue) => {
      const [key, value] = keyValue;
      if (key === "tags") {
        return { ...acc, tags: value.split(",").map((tag) => tag.trim()) };
      }
      return { ...acc, [key]: value };
    }, {} as MarkdownMeta);
  const content = marked.parse(body) as string;
  return { content, ...rest };
}
