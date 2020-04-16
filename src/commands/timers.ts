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
