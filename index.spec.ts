import { puppet } from "./index";

describe("puppet basic run", () => {
  it("downloads and runs URL", async () => {
    const result = await puppet("https://pastebin.com/raw/bqRmm1z9");
    expect(result).toBeTruthy();
  });
  it("runs array of commands", async () => {
    const result = await puppet([
      "go to example.com",
      "take a screenshot",
      "save to example.png",
    ]);
    expect(result).toBeTruthy();
  });
  it("runs a file path", async () => {
    const result = await puppet("examples/screenshot.txt");
    expect(result).toBeTruthy();
  });
  it("throws if no commands", async () => {
    expect((puppet as any)()).rejects.toEqual(
      new Error("Argument must be a string or an array of strings")
    );
  });
});

describe("cleans commands", () => {
  it("trims commands", async () => {
    const result = await puppet([
      "go to example.com   ",
      "   take a screenshot",
    ]);
    expect(result.commands).toEqual(["go to example.com", "take a screenshot"]);
  });
  it("removes empty commands", async () => {
    const result = await puppet(["go to example.com", "take a screenshot", ""]);
    expect(result.commands).toEqual(["go to example.com", "take a screenshot"]);
  });
  it("lowercases commands", async () => {
    const result = await puppet(["Go to www.example.com"]);
    expect(result.commands).toEqual(["go to www.example.com"]);
  });
});

describe("puppet commands", () => {
  it("waits for a specific time", async () => {
    const time = new Date().getTime();
    await puppet(["wait for 1 second"]);
    expect(new Date().getTime() - time).toBeGreaterThan(1000);
  });
  it("go to a URL", async () => {
    const result = await puppet(["go to example.com"]);
    expect(result.url).toBe("http://example.com/");
  });
  it("go to a full URL", async () => {
    const result = await puppet(["go to https://example.com"]);
    expect(result.url).toBe("https://example.com/");
  });
  it("wait for navigation", async () => {
    const result = await puppet([
      "go to https://example.com",
      "click on more information link",
      "wait for navigation",
    ]);
    expect(result.url).toBe("https://www.iana.org/domains/reserved");
  });
});
