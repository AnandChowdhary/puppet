import { wait, lastWord } from "./helpers";

describe("helpers", () => {
  it("wait", async () => {
    const time = new Date().getTime();
    await wait(1000);
    expect(new Date().getTime() - time).toBeGreaterThanOrEqual(1000);
  });

  it("last word", async () => {
    expect(lastWord("Hello, world")).toBe("world");
  });
  it("last word with multiple spaces", async () => {
    expect(lastWord("Hello   world")).toBe("world");
  });
  it("last word with end space", async () => {
    expect(lastWord("Hello   world ")).toBe("world");
  });
});
