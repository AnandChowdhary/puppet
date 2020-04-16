import { puppet } from "../";
import { launch } from "puppeteer";
import { screenshot, saveAsPdf, saveAsHtml } from "./save-page-as";
import { readFile, unlink } from "fs-extra";
import { join } from "path";
jest.setTimeout(30000);

describe("puppet - HTML", () => {
  it("saveAsHtml", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = await saveAsHtml("save as HTML", page, "");
    await browser.close();
    expect(result.length).toBeGreaterThan(1000);
  });
  it("download page HTML", async () => {
    await puppet(["go to example.com", "save as HTML", "save to basic.html"]);
    const file = await readFile(join(".", "basic.html"));
    expect(file).toBeDefined();
    expect(file.length).toBeGreaterThan(100);
  });
});

describe("puppet - PDF", () => {
  it("saveAsPdf", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = await saveAsPdf("save as PDF", page, "");
    await browser.close();
    expect(result.length).toBeGreaterThan(1000);
  });
  it("create a PDF", async () => {
    await puppet(["go to example.com", "save as PDF", "save to basic.pdf"]);
    const file = await readFile(join(".", "basic.pdf"));
    expect(file).toBeDefined();
    expect(file.length).toBeGreaterThan(1);
  });
});

describe("puppet - screenshot", () => {
  it("screenshot", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = await screenshot("take a screenshot", page, "");
    await browser.close();
    expect(result.length).toBeGreaterThan(1000);
  });
  it("JPEG screenshot", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = await screenshot("take a JPEG screenshot", page, "");
    await browser.close();
    expect(result.length).toBeGreaterThan(1000);
  });
  it("full screenshot", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = await screenshot("take a full screenshot", page, "");
    await browser.close();
    expect(result.length).toBeGreaterThan(1000);
  });
  it("transparent screenshot", async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const result = await screenshot("take a transparent screenshot", page, "");
    await browser.close();
    expect(result.length).toBeGreaterThan(1000);
  });
  it("take basic screenshot", async () => {
    await puppet([
      "go to example.com",
      "take a screenshot",
      "save to basic.png",
    ]);
    const file = await readFile(join(".", "basic.png"));
    expect(file).toBeDefined();
    expect(file.length).toBeGreaterThan(1);
  });
  it("take JPEG screenshot", async () => {
    await puppet([
      "go to example.com",
      "take a JPG screenshot",
      "save to basic.jpeg",
    ]);
    const file = await readFile(join(".", "basic.jpeg"));
    expect(file).toBeDefined();
    expect(file.length).toBeGreaterThan(1);
  });
  it("take full page screenshot", async () => {
    await puppet([
      "go to example.com",
      "take a full screenshot",
      "save to full.png",
    ]);
    const file = await readFile(join(".", "full.png"));
    expect(file).toBeDefined();
  });
  it("take transparent screenshot", async () => {
    await puppet([
      "go to example.com",
      "take a transparent screenshot",
      "save to transparent.png",
    ]);
    const file = await readFile(join(".", "transparent.png"));
    expect(file).toBeDefined();
  });
  it("take background-less screenshot", async () => {
    await puppet([
      "go to example.com",
      "take a screenshot, omit background",
      "save to transparent.png",
    ]);
    const file = await readFile(join(".", "transparent.png"));
    expect(file).toBeDefined();
  });
  afterAll(async () => {
    await unlink(join(".", "basic.pdf"));
    await unlink(join(".", "basic.html"));
    await unlink(join(".", "basic.png"));
    await unlink(join(".", "basic.jpeg"));
    await unlink(join(".", "full.png"));
    await unlink(join(".", "transparent.png"));
  });
});
