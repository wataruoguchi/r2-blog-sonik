# [r2-blog](https://github.com/yusukebe/r2-blog) :handshake: [Sonik](https://github.com/sonikjs/sonik)

This experimental project was driven by my curiosity about the `r2-blog` project and building an SSR project. Before this project, I learned how to create an SSR project with React to obtain understanding. MOST of the things I implemented here can be achievable by other SSR frameworks such as Remix and NextJS. But the point is to develop my knowledge and experience.

## Setup

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
