import { launch, Page } from "puppeteer";
import { log } from "signale";
import got from "got";
import { readFile } from "fs-extra";
import { join } from "path";
import ms from "ms";

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
  log("Starting Puppet");
  const browser = await launch();
  const page = await browser.newPage();
  for await (const command of commands) {
    await _command(command, page);
  }
  const result = { commands, url: page.url() };
  await browser.close();
  return result;
};
_puppet(["open example.com"]).then((r) => console.log(r));

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const _command = async (command: string, page: Page) => {
  if (command.startsWith("wait")) await wait(commmand);
  return page;
};
