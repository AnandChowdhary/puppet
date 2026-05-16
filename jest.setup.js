const puppeteer = require("puppeteer");

if (process.env.PUPPETEER_DISABLE_SANDBOX === "true") {
  const originalLaunch = puppeteer.launch.bind(puppeteer);

  puppeteer.launch = options =>
    originalLaunch({
      ...options,
      args: [
        ...(options && options.args ? options.args : []),
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });
}
