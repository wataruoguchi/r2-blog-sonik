import { Context } from "sonik";
import { getR2 } from "../../utils/get-r2";
import { MarkdownMetaWithDate, MarkdownParsed } from "../../../utils/markdown";
import { ISOtoLocal } from "../../utils/iso-to-local";

export default async function AboutName(c: Context) {
  const id = c.req.param("id");
  try {
    const { content, title, tags, description, bannerCredit, bannerUrl } =
      JSON.parse(await getR2(c, `${id}.md`)) as MarkdownParsed;
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
                  <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
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
