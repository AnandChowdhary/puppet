import { puppet } from "./index";

describe("puppet basic run", () => {
  it("downloads and runs URL", async () => {
    const result = await puppet("https://pastebin.com/raw/bqRmm1z9");
    expect(result).toBeUndefined();
  });
  it("runs array of commands", async () => {
    const result = await puppet([
      "go to example.com",
      "take a screenshot",
      "save to example.png",
    ]);
    expect(result).toBeUndefined();
  });
  it("runs a file path", async () => {
    const result = await puppet("examples/screenshot.txt");
    expect(result).toBeUndefined();
  });
  it("throws if no commands", async () => {
    expect((puppet as any)()).rejects.toEqual(
      new Error("Argument must be a string or an array of strings")
    );
  });
});
