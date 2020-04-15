import { launch, Page } from "puppeteer";
import { log } from "signale";
import got from "got";
import {} from "fs-extra";

/**
 *
 * @param commandsOrFile - Commands for Pupper or a file path/URL
 * @example puppet("path/to/commands.puppet")
 * @example puppet("https://example.com/commands.puppet")
 * @example puppet(["go to example.com", "download page as PDF"])
 */
export const puppet = async (commandsOrFile: string[] | string) => {
  if (typeof commandsOrFile === "string") {
    return puppetFile(commandsOrFile);
  } else if (Array.isArray(commandsOrFile)) {
    return _puppet(commandsOrFile);
  }
  throw new Error("Argument must be a string or an array of strings");
};

const puppetFile = async (file: string) => {
  if (file.startsWith("https://") || file.startsWith("http://")) {
    const commands = await got.get(file);
    return _puppet(commands.body.split("\n"));
  }
  console.log("Starting Puppet");
};

const _puppet = async (commands: string[]) => {
  log("Starting Puppet");
};
