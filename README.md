# [r2-blog](https://github.com/yusukebe/r2-blog) :handshake: [Sonik](https://github.com/sonikjs/sonik)

This experimental project was driven by my curiosity about the [r2-blog](https://github.com/yusukebe/r2-blog) project and building an SSR application with [Sonik](https://github.com/sonikjs/sonik).
Most of the things I implemented here can be achievable by other SSR frameworks such as Remix and NextJS. The entire point is to gain knowledge and experience building an SSR application on top of the [cloudflare pages](https://pages.cloudflare.com/).

## Screenshots

1. The list of blog posts is available

![The list of blog posts is available](https://private-user-images.githubusercontent.com/8963743/290963318-3889f5f0-2cdb-4741-9211-3a1eda6ae464.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI3NDMxOTksIm5iZiI6MTcwMjc0Mjg5OSwicGF0aCI6Ii84OTYzNzQzLzI5MDk2MzMxOC0zODg5ZjVmMC0yY2RiLTQ3NDEtOTIxMS0zYTFlZGE2YWU0NjQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMTIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzEyMTZUMTYwODE5WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NjU3YjRjZTY4ODU5MGJmY2U1ODMyYjQwYmQyZTk1YzNiOTA2NGVjNzYyMGU0YTRkMDE0YzIyODNmOGFkNTQxMyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.cBkxDxveu-cUClHkAarUh95_8wzkyW50KKGX50at_y4)

2. Blog posts can be looked up by selecting a tag

![The blog post can be looked up by selecting a tag](https://private-user-images.githubusercontent.com/8963743/290963324-d615aa41-096a-48a9-91b9-03bae1f09794.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI3NDMxOTksIm5iZiI6MTcwMjc0Mjg5OSwicGF0aCI6Ii84OTYzNzQzLzI5MDk2MzMyNC1kNjE1YWE0MS0wOTZhLTQ4YTktOTFiOS0wM2JhZTFmMDk3OTQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMTIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzEyMTZUMTYwODE5WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NDNlOWE0YTY4NTNiMjE2NWZlN2ViYmVkOWIxZmQyMzZiMWU1MTBlOGZmOTZhMmVlMGIyNzg0YzQ2MWNhMDliOCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.3LnZNCbjSovoxUH3nrQ2umzvSXJ_BKnAMmIhoN6dwDU)

3. The blog post Markdown is parsed and converted into HTML. Emoji and syntax highlights are supported.

   ![The blog post Markdown is parsed and converted into HTML. Emoji and syntax highlights are supported.](https://private-user-images.githubusercontent.com/8963743/290963610-7d104c95-1d4f-4731-8bc2-4b543c6ad62c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI3NDMxOTksIm5iZiI6MTcwMjc0Mjg5OSwicGF0aCI6Ii84OTYzNzQzLzI5MDk2MzYxMC03ZDEwNGM5NS0xZDRmLTQ3MzEtOGJjMi00YjU0M2M2YWQ2MmMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMTIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzEyMTZUMTYwODE5WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NTQ3NzMzZmExNTkwNDNlNGNmMTIyZWUwMjhkYTg2YzZjNmI4NDdlYTZhZTdhYjkzMjQyZTM3YjVjOWM2ODE4YiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.V38hvAGwr1krYVcsJNDUYXAWOUJ7m6eXX2Luf1PPgu0)

4. It supports dark mode (Client side)

![It supports dark mode (Client side)](https://private-user-images.githubusercontent.com/8963743/290963326-8fd782fc-db93-47a3-bd0b-e3427cffd546.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI3NDMxOTksIm5iZiI6MTcwMjc0Mjg5OSwicGF0aCI6Ii84OTYzNzQzLzI5MDk2MzMyNi04ZmQ3ODJmYy1kYjkzLTQ3YTMtYmQwYi1lMzQyN2NmZmQ1NDYucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMTIxNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzEyMTZUMTYwODE5WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MmI5NDkxNzg0ZmRiMTJlMTEwMjE0NTcwODQwMTY0ZTZmYWU0YjMzY2FkOWZlZjQzMzc1Mzk5ZjZlNGMxMDlhNSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.8VG4sklfS9J2c7tJ76xZeFyL_4bOQNdDHzvELXefaok)

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
