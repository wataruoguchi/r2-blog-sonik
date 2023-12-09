import md from "markdown-it";
import mdFrontmatter from "markdown-it-front-matter";

type MarkdownMeta = {
  title: string;
  tags: string[];
};
type MarkdownParsed = {
  content: string;
} & MarkdownMeta;
export function parseMarkdown(markdown: string): MarkdownParsed {
  let frontmatter: MarkdownMeta = { title: "", tags: [] };
  const content = md({ html: true, breaks: false, typographer: true })
    .use(mdFrontmatter, (str: string) => {
      frontmatter = str
        .split("\n")
        .map((line: string) => line.split(": "))
        .reduce((acc, keyValue) => {
          const [key, value] = keyValue;
          if (key === "tags") {
            return { ...acc, tags: value.split(",") };
          }
          return { ...acc, [key]: value };
        }, {} as MarkdownMeta);
    })
    .render(markdown);
  return { content, ...frontmatter };
}
