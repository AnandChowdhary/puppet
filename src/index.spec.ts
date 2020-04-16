import { puppet } from "./index";
jest.setTimeout(30000);

describe("puppet basic run", () => {
  it("downloads and runs URL", async () => {
    const result = await puppet("https://pastebin.com/raw/bqRmm1z9");
    expect(result).toBeTruthy();
  });
  it("runs array of commands", async () => {
    const result = await puppet(["go to example.com", "go to example.org"]);
    expect(result).toBeTruthy();
  });
  it("runs a file path", async () => {
    const result = await puppet("src/examples/go-to.txt");
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
      "   go to example.org",
    ]);
    expect(result.commands).toEqual(["go to example.com", "go to example.org"]);
  });
  it("removes empty commands", async () => {
    const result = await puppet(["go to example.com", "go to example.org", ""]);
    expect(result.commands).toEqual(["go to example.com", "go to example.org"]);
  });
  it("lowercases commands", async () => {
    const result = await puppet(["Go to www.example.com"]);
    expect(result.commands).toEqual(["go to www.example.com"]);
  });
});

describe("puppet commands", () => {
  it("throws if invalid commands", async () => {
    expect(puppet(["Unknown command"])).rejects.toEqual(
      new Error("Command not understood: unknown command")
    );
  });
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
});
