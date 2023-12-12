import hljs from "highlight.js";
import md from "markdown-it";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { full as emoji } from "markdown-it-emoji";
import mdFrontmatter from "markdown-it-front-matter";

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
export function parseMarkdown(markdown: string): MarkdownParsed {
  let frontmatter: MarkdownMeta = { title: "", tags: [] };
  const content = md({
    html: true,
    breaks: false,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`;
        } catch (__) {
          return "";
        }
      }
      return "";
    },
  })
    .use(mdFrontmatter, (str: string) => {
      frontmatter = str
        .split("\n")
        .map((line: string) => line.split(": "))
        .reduce((acc, keyValue) => {
          const [key, value] = keyValue;
          if (key === "tags") {
            return { ...acc, tags: value.split(",").map((tag) => tag.trim()) };
          }
          return { ...acc, [key]: value };
        }, {} as MarkdownMeta);
    })
    .use(emoji)
    .render(markdown);
  return { content, ...frontmatter };
}
