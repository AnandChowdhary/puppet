import { puppet } from "../";
import { waitForTime } from "./timers";
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
});
