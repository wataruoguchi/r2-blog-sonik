import type { LayoutHandler } from "@sonikjs/react";
import DarkModeToggle from "../islands/dark-mode-toggle";
import { getAuthor } from "../utils/get-author";

const handler: LayoutHandler = ({ children, head }) => {
  const { name: authorName } = getAuthor();
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {authorName ? <meta name="author" content={authorName} /> : null}
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
        {
          // Mitigate flashing by the script below.
        }
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList[localStorage.getItem('usehooks-ts-dark-mode') === 'true' ? 'add' : 'remove']('dark')`,
          }}
        />
      </head>
      <body className="bg-white dark:bg-custom-color text-neutral-950 dark:text-slate-200">
        <div className="flex flex-col min-h-screen">
          <header className="px-4 lg:px-6 h-20 flex items-center">
            <a href="/" className="flex items-center justify-center">
              My Blog
            </a>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              {[
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
              ].map((navItem) => (
                <a
                  key={navItem.href}
                  href={navItem.href}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  {navItem.label}
                </a>
              ))}
              <DarkModeToggle />
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white-100">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              © {authorName}. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default handler;
