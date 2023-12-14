import { Context } from "sonik";
import { getR2 } from "../../utils/get-r2";
import { MarkdownMetaWithDate, parseMd } from "../../../utils/markdown";
import { ISOtoLocal } from "../../utils/iso-to-local";

export default async function AboutName(c: Context) {
  const id = c.req.param("id");
  try {
    const { content, title, tags, description, bannerCredit, bannerUrl } =
      parseMd(await getR2(c, `${id}.md`));
    const { createdDate } = JSON.parse(await getR2(c, `dict.json`)).dict?.[
      `${id}.md`
    ] as MarkdownMetaWithDate;
    return c.render(
      <div className="flex-1">
        <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
          <article className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
            <div className="space-y-2 not-prose">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Posted on {ISOtoLocal(createdDate)}
              </p>
            </div>
            <figure className="lg:-mx-12 xl:-mx-20">
              <img
                alt={bannerCredit}
                className="aspect-video overflow-hidden rounded-lg object-cover"
                height="340"
                src={bannerUrl}
                width="1250"
              />
              <figcaption className="text-center">{bannerCredit}</figcaption>
            </figure>
            <div className="mt-8">
              <p dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="mt-8">
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <span
                    id={tag}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
        {/**
         * https://highlightjs.org/#usage
         * https://cdnjs.com/libraries/highlight.js
         */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
          integrity="sha512-hasIneQUHlh06VNBe7f6ZcHmeRTLIaQWFd43YriJ0UND19bvYRauxthDg8E4eVNPm9bRUhr5JGeqH7FRFXQu5g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
          integrity="sha512-D9gUyxqja7hBtkWpPWGt9wfbfaMGVt9gnyCvYa+jojwwPHLCzUm5i8rpk7vD7wNee9bA35eYIjobYPaQuKS1MQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/typescript.min.js"
          integrity="sha512-GsPn8jZedZaPLThVdRVJ9kvS02HmLZBsoC9qon3IZE8Al7pUBlDIK4IzAtMbxtZ2GtLMFhHusOLTwf2JIDr0oA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/json.min.js"
          integrity="sha512-Tj35Q81ghoSFK84ee0H7qn2IjAyKwZQ9oYJDjtBmKOmlSz3MUqHrXxoMxIR9GrXzFakEiSV/VMrWwyAp45Bqjw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/javascript.min.js"
          integrity="sha512-H69VMoQ814lKjFuFwLImb4OwoK8Rm8fcvsqZexaxjp/VkJfEnrt5TO7oaOdNlMf/j51QUctfLTe8+rgozW7l2A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/bash.min.js"
          integrity="sha512-i0JFeiLhgBAMGfIEVqMQwALhhse1orgl34XyotSUNiNbDIB1qS9IK53sDochCIrwvj4nJ51CsDSOqhGyhZITGg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/markdown.min.js"
          integrity="sha512-OPn2UK2VPojF+Hh0tfLSMiaKfP0MpRfam/6Q9VVA7LK070PkQxvffqe6chqyp6R2Ml2K7+VOdxEbMpjIKwnCAw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `hljs.highlightAll();`,
          }}
        />
      </div>,
      {
        title: `${title}`,
        meta: [
          {
            name: "description",
            key: "description",
            content: description ?? "",
          },
          {
            name: "keywords",
            key: "keywords",
            content: tags?.join(", ") ?? "",
          },
        ],
      },
    );
  } catch (e) {
    // TODO: Create a 5xx error page
    return c.render(
      <div className="flex-1">
        <div className="container px-4 md:px-6 lg:mx-auto">
          <h1>Something went wrong</h1>
          <div>Please let the author know that the "{id}" page is broken.</div>
        </div>
      </div>,
      {
        title: `Error: ${id}`,
      },
    );
  }
}
