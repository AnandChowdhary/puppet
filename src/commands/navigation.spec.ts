import { puppet } from "../";
import { launch } from "puppeteer";
import { navigateTo } from "./navigation";
jest.setTimeout(30000);

describe("puppet - HTML", () => {
  it("navigate to page", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = (await navigateTo("navigate to example.org", page, "")) || {
      url: () => "",
    };
    await browser.close();
    expect(result.url()).toBe("http://example.org/");
  });
  it("go to url", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = (await navigateTo(
      "go to url http://example.org",
      page,
      ""
    )) || {
      url: () => "",
    };
    await browser.close();
    expect(result.url()).toBe("http://example.org/");
  });
  it("open page", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = (await navigateTo("open example.org", page, "")) || {
      url: () => "",
    };
    await browser.close();
    expect(result.url()).toBe("http://example.org/");
  });
  it("go to page", async () => {
    const result = await puppet(["go to example.com"]);
    expect(result.url).toBe("http://example.com/");
  });
  it("navigate to page", async () => {
    const result = await puppet(["navigate to example.com"]);
    expect(result.url).toBe("http://example.com/");
  });
  it("open url", async () => {
    const result = await puppet(["open http://example.com"]);
    expect(result.url).toBe("http://example.com/");
  });
});
