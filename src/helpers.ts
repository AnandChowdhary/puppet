import { Page } from "puppeteer";

export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const lastWord = (text: string) =>
  text.split(" ")[text.split(" ").length - 1];

export const removeWords = (text: string, ...words: string[]) =>
  text
    .split(" ")
    .filter((i) => !words.includes(i.trim()))
    .join(" ")
    .replace(/\s\s+/g, " ")
    .trim();

export const waitForNavigationOrTimeout = (
  page: Page,
  timeout: number
): Promise<void> =>
  new Promise((resolve) => {
    page
      .waitForNavigation()
      .then(() => resolve())
      .catch(() => resolve());
    setTimeout(() => resolve(), timeout);
  });
