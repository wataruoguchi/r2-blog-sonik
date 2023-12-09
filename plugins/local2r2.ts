/**
 * Most credit goes to @yusukebe
 * https://github.com/yusukebe/r2-blog/blob/main/plugins/local2r2.ts
 */
import fs from "fs/promises";
import { Miniflare } from "miniflare";
import { relative, resolve } from "path";
import { Plugin } from "vite";

type PromiseType<T extends Promise<unknown>> = T extends Promise<infer R>
  ? R
  : never;
export type R2Bucket = PromiseType<ReturnType<Miniflare["getR2Bucket"]>>;
type Handler = (
  bucket: R2Bucket,
  id: string,
  fileName: string,
) => Promise<void>;
type EventName = "add" | "change" | "unlink";
type Options = {
  dir: string;
  r2Buckets: string[] | Record<string, string>;
  r2Persist?: boolean;
  bindingName?: string;
  handlers?: Record<EventName, Handler>;
};

const nullScript =
  "export default { fetch: () => new Response(null, { status: 404 }) };";

export function local2r2(options: Options): Plugin {
  const mf = new Miniflare({
    modules: true,
    script: nullScript,
    r2Buckets: options.r2Buckets,
    r2Persist: options.r2Persist ?? true,
  });

  const targetDir = resolve(options.dir);

  const plugin: Plugin = {
    name: "local2r2",
    configureServer(server) {
      server.httpServer!.on("close", () => {
        mf.dispose();
      });
      // eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'
      // When `add` is called, `change` is also called.
      server.watcher.on("all", (eventName: EventName, id) => {
        if (!id.startsWith(targetDir)) return;

        const fileName = relative(targetDir, id);
        (async () => {
          try {
            const bucket = await mf.getR2Bucket(
              options.bindingName ?? "BUCKET",
            );
            await (options.handlers ?? handlers)[eventName]?.(
              bucket,
              id,
              fileName,
            );
            server.ws.send({
              type: "full-reload",
              path: "*",
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            console.error(`Error for ${id}:`, error);
          }
        })();
      });
    },
  };
  return plugin;
}

export const handlers: Record<
  EventName,
  (bucket: R2Bucket, id: string, fileName: string) => Promise<void>
> = {
  change: async (bucket, id, fileName) => {
    try {
      await fs.access(id);
      console.info(`${fileName} is updated`);
      const content = await fs.readFile(id, "utf8");
      await bucket.put(fileName, content);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.info(`${fileName} is deleted`);
        await bucket.delete(fileName);
      } else {
        console.error(`Error accessing file ${id}:`, error);
      }
    }
  },
  unlink: async () => {},
  add: async () => {},
};
