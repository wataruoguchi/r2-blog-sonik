import type { Context } from "sonik";
import { getR2 } from "../utils/get-r2";
import { ISOtoLocal } from "../utils/iso-to-local";
import { Section } from "../components/section";
import { getAuthor } from "../utils/get-author";
import { Card } from "../components/card";
import { MarkdownMetaWithDate } from "../../utils/markdown";
import { RightArrow } from "../components/right-arrow";
import { assetPath } from "../asset-path";

export default async function Index(c: Context) {
  const { name: authorName } = getAuthor();
  const { dict }: { dict: Record<string, MarkdownMetaWithDate> } = JSON.parse(
    await getR2(c, "dict.json"),
  );

  return c.render(
    <div className="flex-1">
      <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 lg:mx-auto">
          <div className="grid gap-4 lg:grid-cols-2">
            <img
              alt="Thank you, ChatGPT"
              className="mx-auto object-cover sm:w-full lg:order-last"
              height="400"
              src={assetPath("/assets/hero.webp")}
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width="400"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Hi, I'm Taro Yamada
                </h1>
                <p className="max-w-lg text-gray-500 md:text-xl dark:text-gray-400">
                  Hello there!
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  href="/blog"
                >
                  Blog <RightArrow />
                </a>
                <a
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-blue-500 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  href="#"
                >
                  About <RightArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section>
        <div className="container px-4 md:px-6 lg:mx-auto">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="py-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                eaque autem veniam rem doloribus, dolor cum impedit, modi
                asperiores minus molestias. Ullam alias quaerat voluptas
                obcaecati sed placeat eos qui.
              </p>
              <p className="py-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                eaque autem veniam rem doloribus, dolor cum impedit, modi
                asperiores minus molestias. Ullam alias quaerat voluptas
                obcaecati sed placeat eos qui.
              </p>
            </div>
            <div>
              <p className="py-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                eaque autem veniam rem doloribus, dolor cum impedit, modi
                asperiores minus molestias. Ullam alias quaerat voluptas
                obcaecati sed placeat eos qui. eaque autem veniam rem doloribus,
                dolor cum impedit, modi asperiores minus molestias. Ullam alias
                quaerat voluptas obcaecati sed placeat eos qui.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  href="/about"
                >
                  About <RightArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="container px-4 md:px-6 lg:mx-auto">
          <div className="grid gap-4 lg:grid-cols-2">
            {Object.keys(dict)
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
                <div key={`${idx}`} className="mx-auto">
                  {el}
                </div>
              ))}
          </div>
        </div>
      </Section>
    </div>,
    {
      title: authorName,
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
