import type { Context } from "sonik";
import Counter from "../islands/counter";
import { getR2 } from "../utils/getR2";
import { ISOtoLocal } from "../utils/ISOtoLocal";

export default async function Index(c: Context) {
  const { dict } = JSON.parse(await getR2(c, "dict.json"));
  return c.render(
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {Object.keys(dict).map((key) => (
          <li key={key}>
            <a href={`/blog/${key.replace(/\.md$/, "")}`}>
              <div>
                {dict[key].bannerUrl ? (
                  <img src={dict[key].bannerUrl} alt="" />
                ) : (
                  <></>
                )}
                <span>{dict[key].title}</span>
                <span>{ISOtoLocal(dict[key].createdDate).split(",")[0]}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <h2>
        Hello <a href="/about/me">me</a>!
      </h2>
      <Counter />
    </div>,
    {
      title: "Welcome to Sonik!",
      meta: [
        {
          name: "description",
          content: "This an example for Sonik",
          key: "Key",
        },
      ],
    },
  );
}
