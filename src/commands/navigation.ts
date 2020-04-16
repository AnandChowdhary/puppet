import { Page } from "puppeteer";
import { pending } from "signale";
import { removeWords } from "../helpers";

export const navigateTo = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  const query = removeWords(
    command,
    "navigate",
    "go",
    "open",
    "to",
    "page",
    "url"
  );
  const url = query.startsWith("http") ? query : `http://${query}`;
  pending(`Navigating to ${url}`);
  return page.goto(url);
};
