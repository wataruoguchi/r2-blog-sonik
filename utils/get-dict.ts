type MarkdownFrontmatter = {
  title: string;
  tags: string[];
  description?: string;
  bannerCredit?: string;
  bannerUrl?: string;
};
type MarkdownMeta = MarkdownFrontmatter & {
  createdDate: string;
  updatedDate: string;
};
type Dictionary = Record<string, MarkdownMeta>;
export type MetaInfo = {
  dict: Dictionary;
  tags: string[];
};

export function getUpdatedDict(
  meta: MetaInfo,
  markdownMeta: MarkdownFrontmatter & { id: string },
): MetaInfo {
  const { dict, tags } = meta;
  const { id, ...frontmatter } = markdownMeta;
  const updatedDict = {
    ...dict,
    [id]: dict[id]
      ? { ...dict[id], ...frontmatter, updatedDate: new Date().toISOString() }
      : {
          ...frontmatter,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
        },
  };
  const updatedTags = [...new Set([...tags, ...frontmatter.tags])].sort();
  return {
    dict: updatedDict,
    tags: updatedTags,
  };
}
