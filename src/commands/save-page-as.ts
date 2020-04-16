import { Page } from "puppeteer";
import { complete, pending } from "signale";

export const screenshot = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  pending("Taking a screenshot...");
  const shot = await page.screenshot();
  complete("Took a screenshot");
  return shot;
};
