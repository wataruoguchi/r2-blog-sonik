import type { LayoutHandler } from "@sonikjs/react";
import DarkModeToggle from "../islands/dark-mode-toggle";
import packageJson from "../../package.json?raw";

const handler: LayoutHandler = ({ children, head }) => {
  const { author } = JSON.parse(packageJson);
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {author ? <meta name="author" content={author} /> : null}
        {head.createTags()}
        {import.meta.env.PROD ? (
          <>
            <link href="/static/style.css" rel="stylesheet" />
            <script type="module" src="/static/client.js"></script>
          </>
        ) : (
          <>
            <link href="/app/style.css" rel="stylesheet" />
            <script type="module" src="/app/client.ts"></script>
          </>
        )}
      </head>
      <body className="bg-white dark:bg-black">
        <div className="wrapper">
          <DarkModeToggle />
          <header>
            <h1 className="text-pink-500">
              Link to <a href="/">Top</a>
            </h1>
          </header>
          {children}
          <footer style={{ marginTop: "2rem" }}>
            <small>© 2023 your name</small>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default handler;
