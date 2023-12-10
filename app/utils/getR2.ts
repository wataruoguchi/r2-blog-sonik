import type { Context } from "sonik";

export async function getR2(c: Context, name: string, bucketName = "BUCKET") {
  const data = await c.env[bucketName].get(name);
  if (data) {
    return await data.text();
  } else {
    throw new Error(`No data found for ${name}`);
  }
}
