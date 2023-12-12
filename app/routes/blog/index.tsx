import type { Context } from "sonik";
import { getAuthor } from "../../utils/get-author";
import { MarkdownMetaWithDate } from "../../../utils/markdown";
import { getR2 } from "../../utils/get-r2";
import { Card } from "../../components/card";
import { ISOtoLocal } from "../../utils/iso-to-local";
import { Section } from "../../components/section";

export default async function Index(c: Context) {
  const qFromQueryParams = c.req.query("q");
  const { name: authorName } = getAuthor();
  const {
    dict,
    idsByTag,
  }: {
    dict: Record<string, MarkdownMetaWithDate>;
    idsByTag: Record<string, string>;
  } = JSON.parse(await getR2(c, "dict.json"));

  return c.render(
    <div className="flex-1">
      <div className="container px-4 md:px-6 lg:mx-auto">
        <Section>
          <h2 className="text-lg">Search blog by a tag</h2>
          <div>
            {Object.keys(idsByTag).map((tag) => (
              <a
                id={tag}
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 mx-1 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                href={`/blog?q=${tag}`}
              >
                {tag}
              </a>
            ))}{" "}
            or{" "}
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 mx-1 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              href="/blog"
            >
              View All
            </a>
          </div>
        </Section>
        <Section>
          <h2 className="text-lg">Blog Posts</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {Object.keys(dict)
              .filter((key) =>
                qFromQueryParams
                  ? dict[key].tags.includes(qFromQueryParams)
                  : true,
              )
              .sort((keyA, keyB) => {
                return (
                  -1 *
                  dict[keyA].createdDate.localeCompare(dict[keyB].createdDate)
                );
              })
              .map((key) => (
                <Card
                  key={key}
                  imageSrc={dict[key].bannerUrl}
                  imageAlt={dict[key].title}
                  title={dict[key].title}
                  date={ISOtoLocal(dict[key].createdDate).split(",")[0]}
                  link={`/blog/${key.replace(/\.md$/, "")}`}
                />
              ))
              .map((el, idx) => (
                <div id={`${idx}`} className="mx-auto py-2">
                  {el}
                </div>
              ))}
          </div>
        </Section>
      </div>
    </div>,
    {
      title: `Blog posts - ${authorName}`,
      meta: [
        {
          name: "description",
          content: `Blog website created by ${authorName}`,
          key: "Key",
        },
      ],
    },
  );
}
