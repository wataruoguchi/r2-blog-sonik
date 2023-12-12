import packageJson from "../../package.json?raw";
export function getAuthor() {
  const { author } = JSON.parse(packageJson);
  // Pattern match to get the author name, email, and url from "Name <email> (url)"
  const authorRegex = /(.*) <(.*)> \((.*)\)/;
  const [, name, email, url] = author.match(authorRegex);
  return { name, email, url };
}
