import type { Context } from "sonik";
import { Section } from "../../components/section";
import { getAuthor } from "../../utils/get-author";

export default async function Index(c: Context) {
  const { name: authorName } = getAuthor();

  return c.render(
    <div className="flex-1">
      <Section>
        <div className="container px-4 md:px-6 lg:mx-auto">
          <h1 className="text-lg">Hello, cool developers!</h1>
        </div>
      </Section>
    </div>,
    {
      title: `About- ${authorName}`,
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
