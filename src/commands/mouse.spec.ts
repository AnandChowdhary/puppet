import { puppet } from "../";
import { launch } from "puppeteer";
import { triggerMouseClickMove } from "./mouse";
import { join } from "path";
jest.setTimeout(30000);

describe("puppet - mouse", () => {
  it("trigger mouse click", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = await triggerMouseClickMove(
      "click on point 100, 100",
      page,
      ""
    );
    await browser.close();
    expect(result).toBeUndefined();
  });
  it("trigger mouse move", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = await triggerMouseClickMove(
      "move to point 100,100",
      page,
      ""
    );
    await browser.close();
    expect(result).toBeUndefined();
  });
  it("loads page and clicks", async () => {
    const { url } = await puppet([
      "go to example.com",
      "click on point 199, 12",
    ]);
    expect(url).toBe("http://example.com/");
  });
  it("loads page and moves", async () => {
    const { url } = await puppet(["go to example.com", "move to [199, 12]"]);
    expect(url).toBe("http://example.com/");
  });
});
