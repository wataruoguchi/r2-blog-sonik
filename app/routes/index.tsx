import type { Context } from "sonik";
import Counter from "../islands/counter";

export default async function Index(c: Context) {
  const listFile = await c.env.BUCKET.get("list.json");
  const listMap = listFile ? JSON.parse(await listFile.text()) : {};

  return c.render(
    <div>
      <h3>List</h3>
      <ul>
        {Object.keys(listMap).map((key) => (
          <li key={key}>
            {key}: {JSON.stringify(listMap[key])}
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
