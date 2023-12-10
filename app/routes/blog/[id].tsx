import { Context } from "sonik";
import { getR2 } from "../../utils/getR2";

export default async function AboutName(c: Context) {
  const id = c.req.param("id");
  try {
    const { content, title, tags } = JSON.parse(await getR2(c, `${id}.md`));
    return c.render(
      <div>
        {tags?.length ? <div>Tags: {tags.join(", ")}</div> : <></>}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>,
      {
        title: `${title}`,
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
