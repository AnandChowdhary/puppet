import { Page } from "puppeteer";
import { complete, pending } from "signale";
import { wait, removeWords } from "../helpers";
import ms from "ms";

export const waitForTime = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  pending("Waiting...");
  await wait(ms(removeWords(command, "wait", "for")));
  complete("Waited");
};

export const waitForNavigation = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  pending("Waiting for navigation...");
  const result = await page.waitForNavigation();
  complete("Waited");
  return result;
};