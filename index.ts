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

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
const lastWord = (text: string) => text.split(" ")[text.split(" ").length - 1];
const removeWords = (text: string, ...words: string[]) =>
  text
    .split(" ")
    .filter((i) => !words.includes(i.trim()))
    .join(" ")
    .replace(/\s\s+/g, " ")
    .trim();
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

const _command = async (command: string, page: Page, lastResult: any) => {
  pending("Running command", command);
  if (command.includes("screenshot")) return page.screenshot();
  if (command.startsWith("save")) {
    console.log("has save");
    // console.log(join(".", lastWord(command)), lastResult);
    // return writeFile(join(".", lastWord(command)), lastResult);
  }
  if (command === "wait for navigation")
    return waitForNavigationOrTimeout(page, 7500);
  if (command.startsWith("wait"))
    return wait(ms(removeWords(command, "wait", "for")));
  if (
    command.startsWith("navigate") ||
    command.startsWith("go") ||
    command.startsWith("open")
  ) {
    const query = removeWords(
      command,
      "navigate",
      "go",
      "open",
      "to",
      "page",
      "url"
    );
    const url = query.startsWith("http") ? query : `http://${query}`;
    return page.goto(url);
  }
  for await (const event of ["click"]) {
    if (command.startsWith(event)) {
      const query = removeWords(command, "click");
      let selector = "*";
      const type = lastWord(query);
      if (type === "link") selector = "a";
      if (type === "button") selector = "button";
      if (type === "input") selector = "input";
      if (type === "area") selector = "area";
      if (type === "label") selector = "label";
      if (type === "textarea") selector = "textarea";
      if (type === "image") selector = "img";
      let elementToClick: HTMLElement | undefined = undefined;
      await page.$$eval(selector, (elements) => {
        const text = removeWords(
          query,
          "link",
          "button",
          "input",
          "area",
          "label",
          "textarea",
          "image"
        );
        elements.forEach((element) => {
          if (
            (element as HTMLElement).innerText
              .toLocaleLowerCase()
              .includes(text)
          )
            elementToClick = element as HTMLElement;
        });
      });
      console.log("FOUND element", elementToClick);
      // if (elementToClick) {
      // console.log("GOT ELEMENT", elementToClick);
      // (elementToClick as HTMLElement).click();
      // }
      return;
    } else {
      // console.log("DOES NOT START WITH", command, event);
    }
    // throw new Error(`Element not found: ${text}`);
  }
  throw new Error(`Command not understood: ${command}`);
};

puppet([
  "go to https://example.com",
  "take a screenshot",
  "save to screenshot.png",
  // "click on more information link",
  // "wait for navigation",
]);
