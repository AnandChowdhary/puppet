import { Page } from "puppeteer";
import { complete, pending } from "signale";
import { join } from "path";
import { lastWord } from "../helpers";
import { writeFile } from "fs-extra";

export const saveToFile = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  const path = join(".", lastWord(command));
  pending(`Saving ${Buffer.from(lastResult || "").byteLength}b file`);
  await writeFile(path, lastResult);
  complete(`Saved to file ${path}...`);
};
