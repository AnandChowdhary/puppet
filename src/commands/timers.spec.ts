import { puppet } from "../";
import { waitForTime, waitForNavigation } from "./timers";
import { launch } from "puppeteer";
jest.setTimeout(30000);

describe("puppet - timers", () => {
  it("saves to file", async () => {
    const now = new Date().getTime();
    await waitForTime("wait for 1 second", {} as any, "");
    expect(new Date().getTime() - now).toBeGreaterThanOrEqual(1000);
  });
  it("waits in puppet", async () => {
    const now = new Date().getTime();
    await puppet([
      "go to example.com",
      "wait for 1 second",
      "go to example.org",
    ]);
    expect(new Date().getTime() - now).toBeGreaterThanOrEqual(1000);
  });
  it("wait for navigation", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const [_, navigationResult] = await Promise.all([
      page.click("body > div > p:nth-child(3) > a"),
      waitForNavigation("", page, "")
    ]);
    expect(navigationResult.url()).toBe("https://www.iana.org/domains/reserved");
    await browser.close();
  });
});
