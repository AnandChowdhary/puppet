import { Page } from "puppeteer";
import { success, pending } from "signale";

export const screenshot = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  pending("Taking a screenshot...");
  const shot = await page.screenshot();
  success("Took a screenshot");
  return shot;
};
