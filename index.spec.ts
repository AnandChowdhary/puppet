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
});
