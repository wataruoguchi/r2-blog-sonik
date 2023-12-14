import type { Context } from "sonik";
import { MarkdownMetaWithDate } from "../../utils/markdown";

export async function fetchDict(
  c: Context,
  bucketName = "BUCKET",
): Promise<{
  dict: Record<string, MarkdownMetaWithDate>;
  tags: Array<string>;
}> {
  const data = await fetchFromR2(c, "dict.json", bucketName);
  return data ? JSON.parse(data) : { dict: {}, tags: [] };
}

export function fetchMarkdown(c: Context, id: string, bucketName = "BUCKET") {
  return fetchFromR2(c, `${id}.md`, bucketName) as Promise<string | undefined>;
}

async function fetchFromR2(c: Context, name: string, bucketName = "BUCKET") {
  const data = await c.env[bucketName].get(name);
  if (data) {
    return await data.text();
  } else {
    throw new Error(`No data found for ${name}`);
  }
}
