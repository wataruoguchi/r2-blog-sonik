import pages from "@sonikjs/cloudflare-pages";
import fs from "fs/promises";
import { resolve } from "path";
import sonik from "sonik/vite";
import { defineConfig } from "vite";
import { R2Bucket, handlers, local2r2 } from "./plugins/local2r2";
import { MarkdownMeta, parseMarkdown } from "./utils/markdown";

export default defineConfig(({ command }) => {
  const defaultConfig = {
    ssr: {
      // The modules designed for running on the client side.
      external: ["usehooks-ts"],
    },
    define: {
      "process.env": process.env,
    },
    plugins: [
      sonik({
        devServer: {
          cf: {
            r2Buckets: ["BUCKET"],
            r2Persist: true,
          },
        },
      }),
      pages(),
    ],
  };

  if (command === "build") {
    return defaultConfig;
  }
  return {
    ...defaultConfig,
    plugins: [
      ...defaultConfig.plugins,
      local2r2({
        dir: "./blog-posts",
        r2Buckets: ["BUCKET"],
        bindingName: "BUCKET",
        handlers: {
          ...handlers,
          change: async (bucket, id, fileName) => {
            await updateDict(bucket, id, fileName);
            await handlers.change(bucket, id, fileName, {
              md: (orig: string) => JSON.stringify(parseMarkdown(orig)),
            });
          },
        },
      }),
    ],
  };
});

async function updateDict(_bucket: R2Bucket, id: string, filename: string) {
  try {
    const dictFilePath = resolve("./blog-posts/dict.json");
    if (id === dictFilePath) return;
    if (!filename.endsWith(".md")) return;
    try {
      await fs.access(dictFilePath);
    } catch (e) {
      await fs.writeFile(dictFilePath, JSON.stringify({}));
    }

    const markdownDoc = await fs.readFile(id, "utf8");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...markdownMeta } = parseMarkdown(markdownDoc);

    type Dictionary = Record<
      string,
      MarkdownMeta & { updatedDate: string; createdDate: string }
    >;
    const {
      dict = {},
    }: {
      dict: Dictionary;
    } = JSON.parse(await fs.readFile(dictFilePath, "utf-8"));

    dict[filename] = dict[filename]
      ? {
          ...dict[filename],
          updatedDate: new Date().toISOString(),
          ...markdownMeta,
        }
      : {
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
          ...markdownMeta,
        };

    const idsByTag = Object.keys(dict).reduce(
      (acc, id: string) => {
        const tags = dict[id].tags;
        tags.forEach((tag) => {
          if (!acc[tag]) {
            acc[tag] = [];
          }
          acc[tag].push(id);
        });
        return acc;
      },
      {} as Record<string, string[]>,
    );

    fs.writeFile(dictFilePath, JSON.stringify({ dict, idsByTag }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("Failed on updating the dict", e);
  }
}
