import pages from "@sonikjs/cloudflare-pages";
import fs from "fs/promises";
import { resolve } from "path";
import sonik from "sonik/vite";
import { defineConfig } from "vite";
import { R2Bucket, handlers, local2r2 } from "./plugins/local2r2";
import { MetaInfo, getUpdatedDict } from "./utils/get-dict";
import { parseMd } from "./utils/markdown";

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
          change: async (bucket, filePath, fileName) => {
            await updateDict(bucket, filePath, fileName);
            await handlers.change(bucket, filePath, fileName);
          },
        },
      }),
    ],
  };
});

async function updateDict(
  _bucket: R2Bucket,
  filePath: string,
  filename: string,
) {
  try {
    const dictFilePath = resolve("./blog-posts/dict.json");
    if (filePath === dictFilePath) return;
    if (!filename.endsWith(".md")) return;
    try {
      await fs.access(dictFilePath);
    } catch (e) {
      await fs.writeFile(dictFilePath, JSON.stringify({ dict: {}, tags: [] }));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...markdownFrontmatter } = parseMd(
      await fs.readFile(filePath, "utf8"),
    );
    const oldDict: MetaInfo = JSON.parse(
      await fs.readFile(dictFilePath, "utf8"),
    );

    fs.writeFile(
      dictFilePath,
      JSON.stringify(
        getUpdatedDict(oldDict, { ...markdownFrontmatter, id: filename }),
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("Failed on updating the dict", e);
  }
}
