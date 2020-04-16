import { Page } from "puppeteer";
import { complete, pending } from "signale";
import { removeWords } from "../helpers";

export const triggerMouseClickMove = async (
  command: string,
  page: Page,
  lastResult: any
) => {
  const points = removeWords(
    command,
    "mouse",
    "click",
    "down",
    "move",
    "up",
    "cursor",
    "mouseclick",
    "mousedown",
    "mousemove",
    "mouseup",
    "on",
    "to",
    "point",
    "points",
    "coordinate",
    "coordinates",
    "using",
    "button",
    "middle",
    "the",
    "left",
    "right",
    "x",
    "[",
    "]"
  )
    .split(" ")
    .map((i) => i.split(","))
    .flat()
    .map((i) => Number(i.trim().replace(/\D/g, "")))
    .filter((i) => i && !isNaN(i));
  const x = points[0];
  const y = points[1];
  if (x === undefined || y === undefined)
    throw new Error("Both X, Y coordinates not found");
  if (command.includes("click")) {
    pending(`Clicking on point [${x}, ${y}]`);
    await page.mouse.click(x, y, {
      button: command.includes("right")
        ? "right"
        : command.includes("middle")
        ? "middle"
        : "left",
    });
  } else if (command.includes("move")) {
    pending(`Moving to position [${x}, ${y}]`);
    await page.mouse.move(x, y);
  } else throw new Error("`click` or `move` required");
  complete("Clicked");
};
