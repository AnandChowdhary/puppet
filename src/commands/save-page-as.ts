import { Page } from "puppeteer";
import { complete, pending } from "signale";

export const screenshot = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  pending("Taking a screenshot...");
  const shot = await page.screenshot({
    fullPage: command.includes("full"),
    type: command.includes("jpg") || command.includes("jpeg") ? "jpeg" : "png",
    omitBackground:
      command.includes("background") &&
      (command.includes("remove") ||
        command.includes("without") ||
        command.includes("omit")),
  });
  complete("Took a screenshot");
  return shot;
};

export const saveAsPdf = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  pending("Generating PDF from page...");
  const pdf = await page.pdf();
  complete("Generated page PDF");
  return pdf;
};

export const saveAsHtml = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  pending("Getting HTML from page...");
  const html = await page.content();
  complete("Got page HTML");
  return html;
};
