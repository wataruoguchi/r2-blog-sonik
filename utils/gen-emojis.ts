// Credit: https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb
import emojilib from "./emojilib.json";

export function emojilibToDict() {
  return emojilib.emojis.reduce(
    (acc, item: { shortname: string; emoji: string }) => {
      acc[item.shortname.replace(/^:|:$/g, "")] = item.emoji;
      return acc;
    },
    {} as Record<string, string>,
  );
}
