import { puppet } from "../";
import { saveToFile } from "./files";
import { readFile, unlink } from "fs-extra";
import { join } from "path";
jest.setTimeout(30000);

describe("puppet - files", () => {
  it("saves to file", async () => {
    await saveToFile("save to example.txt", {} as any, "Hello, world!");
    const txt = await readFile(join(".", "example.txt"), "utf8");
    expect(txt).toBe("Hello, world!");
  });
  it("gets HTML and saves", async () => {
    await puppet([
      "go to example.com",
      "get page html",
      "save to example.html",
    ]);
    const txt = await readFile(join(".", "example.html"), "utf8");
    expect(txt.includes("Example Domain")).toBeTruthy();
  });
  afterAll(async () => {
    await unlink(join(".", "example.txt"));
    await unlink(join(".", "example.html"));
  });
});
