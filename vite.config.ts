import pages from "@sonikjs/cloudflare-pages";
import fs from "fs/promises";
import { resolve } from "path";
import sonik from "sonik/vite";
import { defineConfig } from "vite";
import { R2Bucket, handlers, local2r2 } from "./plugins/local2r2";
import { parseMarkdown } from "./utils/markdown";

export default defineConfig(({ command }) => {
  const defaultConfig = {
    define: {
      "process.env": process.env,
    },
    plugins: [sonik(), pages()],
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
            await updateList(bucket, id, fileName);
            await handlers.change(bucket, id, fileName);
          },
        },
      }),
    ],
  };
});

async function updateList(_bucket: R2Bucket, id: string, filename: string) {
  try {
    const listFilePath = resolve("./blog-posts/list.json");
    if (id === listFilePath) return;
    if (!filename.endsWith(".md")) return;
    try {
      await fs.access(listFilePath);
    } catch (e) {
      await fs.writeFile(listFilePath, JSON.stringify({}));
    }

    const markdownDoc = await fs.readFile(id, "utf8");
    const { title, tags } = parseMarkdown(markdownDoc);

    // Dump the file into memory as a JSON object
    const list = JSON.parse(await fs.readFile(listFilePath, "utf-8"));
    // Find the index of the file in the list. If it exists, update the title.
    list[filename] = list[filename]
      ? {
          ...list[filename],
          updatedDate: new Date().toISOString(),
          title,
          tags,
        }
      : {
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
          title,
          tags,
        };
    fs.writeFile(listFilePath, JSON.stringify(list));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("Failed on updating the list", e);
  }
}
