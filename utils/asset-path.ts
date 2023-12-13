export function assetPath(path: string) {
  return (import.meta.env.PROD ? "/static" : "/app") + path;
}
