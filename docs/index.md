---
theme: jekyll-theme-just-the-docs
title: README
---

# [r2-blog](https://github.com/yusukebe/r2-blog) :handshake: [Sonik](https://github.com/sonikjs/sonik)

This experimental project was driven by my curiosity about the [r2-blog](https://github.com/yusukebe/r2-blog) project and building an SSR application with [Sonik](https://github.com/sonikjs/sonik).
Most of the things I implemented here can be achievable by other SSR frameworks such as Remix and NextJS. The entire point is to gain knowledge and experience building an SSR application on top of the [cloudflare pages](https://pages.cloudflare.com/).

## Screenshots

1. The list of blog posts is available

![The list of blog posts is available](https://github.com/wataruoguchi/r2-blog-sonik/assets/8963743/49e8c0f2-6ab2-47c7-b4e7-36ef04512664)

2. Blog posts can be looked up by selecting a tag

![The blog post can be looked up by selecting a tag](https://github.com/wataruoguchi/r2-blog-sonik/assets/8963743/f6a42120-9276-4593-91c8-ce43c03c293e)

3. The blog post Markdown is parsed and converted into HTML. Emoji and syntax highlights are supported.

   ![The blog post Markdown is parsed and converted into HTML. Emoji and syntax highlights are supported.](https://github.com/wataruoguchi/r2-blog-sonik/assets/8963743/efdd9e49-fa31-4fe2-bca5-ec97a9f99205)

4. It supports dark mode (Client side)

![It supports dark mode (Client side)](https://github.com/wataruoguchi/r2-blog-sonik/assets/8963743/06311460-03ec-472d-bc50-04f692fd82e3)

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
