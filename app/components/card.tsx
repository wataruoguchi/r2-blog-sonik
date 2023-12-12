import { RightArrow } from "./right-arrow";
type CardProps = {
  title: string;
  date: string;
  link: string;
  imageSrc?: string;
  imageAlt?: string;
};
export function Card({ imageSrc, imageAlt, title, date, link }: CardProps) {
  const placeHolderImage = "https://fakeimg.pl/600x400";
  // https://flowbite.com/docs/components/card/
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href={link}>
        <img
          className="max-w rounded-t-lg"
          src={imageSrc || placeHolderImage}
          alt={imageAlt || ""}
        />
      </a>
      <div className="p-5">
        <a href={link}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p>{date}</p>
        </a>
        <a
          href={link}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <RightArrow />
        </a>
      </div>
    </div>
  );
}
