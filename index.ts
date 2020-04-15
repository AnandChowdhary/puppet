import { launch, Page } from "puppeteer";
import { start, success, pending } from "signale";
import got from "got";
import { readFile } from "fs-extra";
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
  for await (const command of commands) {
    await _command(command, page);
  }
  const result = { commands, url: page.url() };
  await browser.close();
  success("Completed Puppet commands");
  return result;
};
_puppet(["open example.com"]).then((r) => console.log(r));

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const lastWord = (text: string) => text.split(" ")[text.split(" ").length - 1];
const waitForNavigationOrTimeout = (
  page: Page,
  timeout: number
): Promise<void> =>
  new Promise((resolve) => {
    page
      .waitForNavigation()
      .then(() => resolve())
      .catch(() => resolve());
    setTimeout(() => resolve(), timeout);
  });

const _command = async (command: string, page: Page): Promise<any> => {
  pending("Running command", command);
  if (command === "wait for navigation")
    return waitForNavigationOrTimeout(page, 10000);
  if (command.startsWith("wait"))
    return wait(ms(command.replace(/wait|for/gi, "").trim()));
  if (
    command.startsWith("navigate") ||
    command.startsWith("go") ||
    command.startsWith("open")
  ) {
    const query = command.replace(/navigate|go|open|to|page|url/gi, "").trim();
    const url = query.startsWith("http") ? query : `http://${query}`;
    return page.goto(url);
  }
  if (command.includes("screenshot")) return;
  if (command.includes("save")) return;
  // for await (const event of ["click"]) {
  //   if (command.startsWith(event)) {
  //     pending("Got event", event);
  //   const query = command.replace(/click|on/gi, "").trim();
  //   let selector = "*";
  //   const type = lastWord(query);
  //   if (type === "link") selector = "a";
  //   if (type === "button") selector = "button";
  //   if (type === "input") selector = "input";
  //   if (type === "area") selector = "area";
  //   if (type === "label") selector = "label";
  //   if (type === "textarea") selector = "textarea";
  //   if (type === "image") selector = "img";
  //   const text = query
  //     .replace(/link|button|input|area|label|textarea|image/gi, "")
  //     .trim();
  //   let elementToClick: HTMLElement | undefined = undefined;
  //   await page.$$eval(selector, (elements) => {
  //     elements.forEach((element) => {
  //       if (
  //         (element as HTMLElement).innerText.toLocaleLowerCase().includes(text)
  //       )
  //         elementToClick = element as HTMLElement;
  //     });
  //   });
  //   if (elementToClick) {
  //     // (elementToClick as HTMLElement).click();
  //   }
  //   return;
  //   }
  //   return;
  // }
  throw new Error(`Command not understood: ${command}`);
};
