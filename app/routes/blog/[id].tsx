import { Context } from "sonik";
import { getR2 } from "../../utils/getR2";
import { MarkdownParsed } from "../../../utils/markdown";

export default async function AboutName(c: Context) {
  const id = c.req.param("id");
  try {
    const { content, title, tags, description, bannerCredit, bannerUrl } =
      JSON.parse(await getR2(c, `${id}.md`)) as MarkdownParsed;
    return c.render(
      <div>
        <img src={bannerUrl} alt={`Photo taken by ${bannerCredit}`} />
        <span>Photo credit: {bannerCredit}</span>
        {tags?.length ? <div>Tags: {tags.join(", ")}</div> : <></>}
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
      <div>
        <h1>Something went wrong</h1>
        <div>Please let the author know that the "{id}" page is broken.</div>
      </div>,
      {
        title: `Error: ${id}`,
      },
    );
  }
}
