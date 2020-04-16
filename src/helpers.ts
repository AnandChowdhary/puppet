export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const lastWord = (text: string) =>
  text.trim().split(" ")[text.split(" ").length - 1];

export const removeWords = (text: string, ...words: string[]) =>
  text
    .split(" ")
    .filter((i) => !words.includes(i.trim()))
    .join(" ")
    .replace(/\s\s+/g, " ")
    .trim();
