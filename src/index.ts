import { launch, Page } from "puppeteer";
import { start, success, pending } from "signale";
import got from "got";
import { readFile, writeFile } from "fs-extra";
import { join } from "path";
import ms from "ms";
// import finder from "@medv/finder";

/**
 *
 * @param commandsOrFile - Commands for Pupper or a file path/URL
 * @example puppet("path/to/commands.puppet")
 * @example puppet("https://example.com/commands.puppet")
 * @example puppet(["go to example.com", "download page as PDF"])
 */
export const puppet = async (commandsOrFile: string[] | string) => {
  if (typeof commandsOrFile === "string") {
    if (
      commandsOrFile.startsWith("https://") ||
      commandsOrFile.startsWith("http://")
    ) {
      const commands = await got.get(commandsOrFile);
      return _puppet(commands.body.split("\n"));
    }
    const commands = await readFile(join(".", commandsOrFile), "utf8");
    return _puppet(commands.split("\n"));
  } else if (Array.isArray(commandsOrFile)) {
    return _puppet(commandsOrFile);
  }
  throw new Error("Argument must be a string or an array of strings");
};

/**
 * Runs Puppet commands
 * @param commands - Commands to run
 */
const _puppet = async (commands: string[]) => {
  commands = commands.map((i) => i.toLocaleLowerCase().trim()).filter((i) => i);
  start("Starting Puppet");
  const browser = await launch();
  const page = await browser.newPage();
  let lastResult: any = undefined;
  for await (const command of commands) {
    lastResult = await _command(command, page, lastResult);
  }
  const result = { commands, url: page.url() };
  await browser.close();
  success("Completed Puppet commands");
  return result;
};

const _command = async (command: string, page: Page, lastResult: any) => {
  pending("Running command", command);
  throw new Error(`Command not understood: ${command}`);
};

puppet([
  "go to https://example.com",
  "take a screenshot",
  "save to screenshot.png",
  // "click on more information link",
  // "wait for navigation",
]);
