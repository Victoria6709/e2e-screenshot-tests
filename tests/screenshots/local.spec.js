const { test, expect } = require('@playwright/test');

test.skip('Перевірка змін сторінки за скриншотом', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  expect(await page.screenshot()).toMatchSnapshot('screenshots/local-page/index-page.png');
});

test.skip('Порівняння скриншота елемента', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const element = await page.locator('h1');
  expect(await element.screenshot()).toMatchSnapshot('screenshots/local-page/index-page-element-h1.png');
});