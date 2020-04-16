import { Page } from "puppeteer";
import { complete, pending } from "signale";
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
  const result = await page.goto(url);
  complete(`Navigated to ${url}`);
  return result;
};
