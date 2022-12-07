const puppeteer = require("puppeteer");
let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 40000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 40000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 40000);
});

describe("GitHub Features test", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/features");
  });
  test("Actions tab header3 test'", async () => {
    const link = await page.$(
      "div.sub-nav-mktg-links:nth-child(3) > a:nth-child(1)"
    );
    await link.click();
    await page.waitForSelector("h3");
    const header = await page.$eval("h3", (link) => link.textContent);
    expect(header).toEqual("GitHub Actions");
  }, 40000);

  test("Packages tab header test'", async () => {
    const link = await page.$("a.mr-lg-3:nth-child(2)");
    await link.click();
    await page.waitForSelector("h1");
    const header = await page.$eval("h1", (link) => link.textContent);
    expect(header).toContain("Your packages");
  }, 40000);

  test("Security tab header test'", async () => {
    const link = await page.$("a.sub-nav-mktg-link:nth-child(3)");
    await link.click();
    await page.waitForSelector("h1");
    const header = await page.$eval("h1", (link) => link.textContent);
    expect(header).toContain("Secure at every");
  }, 40000);
});
