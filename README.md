# [r2-blog](https://github.com/yusukebe/r2-blog) :handshake: [Sonik](https://github.com/sonikjs/sonik)

This experimental project was driven by my curiosity about the [r2-blog](https://github.com/yusukebe/r2-blog) project and building an SSR application with [Sonik](https://github.com/sonikjs/sonik).
Most of the things I implemented here can be achievable by other SSR frameworks such as Remix and NextJS. The entire point is to gain knowledge and experience building an SSR application on top of the [cloudflare pages](https://pages.cloudflare.com/).

## Screenshots

1. The list of blog posts is available

![The list of blog posts is available](https://private-user-images.githubusercontent.com/8963743/290963318-3889f5f0-2cdb-4741-9211-3a1eda6ae464.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI2OTA0NjgsIm5iZiI6MTcwMjY5MDE2OCwicGF0aCI6Ii84OTYzNzQzLzI5MDk2MzMxOC0zODg5ZjVmMC0yY2RiLTQ3NDEtOTIxMS0zYTFlZGE2YWU0NjQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMTIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzEyMTZUMDEyOTI4WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ODYxODM4OWY3NDJlYjY5YTE3MjYwYjIzMGUzMmIwODNjMjE3MWQzZTQ0ZDZkNWE5ODg3MjFmMDgxMGM2YWZlNCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.D64XY0MBZ6OXhjp7WjIp-P6vZ3iOqi8aHa96kW1WNIk)

2. Blog posts can be looked up by selecting a tag

![The blog post can be looked up by selecting a tag](https://private-user-images.githubusercontent.com/8963743/290963324-d615aa41-096a-48a9-91b9-03bae1f09794.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI2OTA0NjgsIm5iZiI6MTcwMjY5MDE2OCwicGF0aCI6Ii84OTYzNzQzLzI5MDk2MzMyNC1kNjE1YWE0MS0wOTZhLTQ4YTktOTFiOS0wM2JhZTFmMDk3OTQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMTIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzEyMTZUMDEyOTI4WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9OGE2ZDI2N2Y3MjYwMGFhNTllOWQ2YWRjNGM4YjZiMGZlMzY4Nzg1YTVlNDE1YzhiYzBmYzNjOGU5ZTJmNDViNiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.beV1OvZEyUE5dp1q0H7h7XQlVBFkPGgBxPZW1SFMFSA)

3. The blog post Markdown is parsed and converted into HTML. Emoji and syntax highlights are supported.

   ![The blog post Markdown is parsed and converted into HTML. Emoji and syntax highlights are supported.](https://private-user-images.githubusercontent.com/8963743/290963610-7d104c95-1d4f-4731-8bc2-4b543c6ad62c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI2OTA3NTcsIm5iZiI6MTcwMjY5MDQ1NywicGF0aCI6Ii84OTYzNzQzLzI5MDk2MzYxMC03ZDEwNGM5NS0xZDRmLTQ3MzEtOGJjMi00YjU0M2M2YWQ2MmMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMTIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzEyMTZUMDEzNDE3WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NWYyOGUzYjdhY2YzN2I2M2Q5YWRlNWMwYjU0MDhmNmY4MTZkMTA3MWYwYmQ2NmM3ZGI5NGFkODQ3YmEwMmJlNyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.fd0jzk5DLkR8JUKdZ0cB4OXFniaEs2Zk3_kZDIC27Lc)

4. It supports dark mode (Client side)

![It supports dark mode (Client side)](https://private-user-images.githubusercontent.com/8963743/290963326-8fd782fc-db93-47a3-bd0b-e3427cffd546.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI2OTA0NjgsIm5iZiI6MTcwMjY5MDE2OCwicGF0aCI6Ii84OTYzNzQzLzI5MDk2MzMyNi04ZmQ3ODJmYy1kYjkzLTQ3YTMtYmQwYi1lMzQyN2NmZmQ1NDYucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMTIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzEyMTZUMDEyOTI4WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YzFlZWQxOTJlMGY3NGU1ZTlmNDY3Mjc5ZmY0MjQxNTMzM2M3ZWI3YzI1YmQyMDY4ZDEwZGU2YThhM2VkOGIzNSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.uEDbTDcsnHTx2Qjo8s9gxJdNgIpqYTMQQuSWpfE1avs)

## Prod Setup

You wouldn't need this step if you just run it locally.

```sh
npx wrangler login
npx wrangler r2 bucket create <your-bucket-name> # Create a bucket
npx wrangler r2 object put <your-bucket-name>/<filename> --file <path/filename> # Put a content into the bucket
```

## Notes

- The modules in `islands` have to be "Default exports". They don't work with "Named exports".
- To prevent flickers for dark mode, an inline script is needed. [stackoverflow](https://stackoverflow.com/questions/63033412/dark-mode-flickers-a-white-background-for-a-millisecond-on-reload)
- The "unkink" event in the `local2r2` is not developed, but it should be super easy to build one.
- `highlight.js` and `prism` do not support ESM, hence, those are loaded via CDN and executed on the client side.

## Kudos

- [vite](https://vitejs.dev)
- And all other dependencies in the `package.json`
