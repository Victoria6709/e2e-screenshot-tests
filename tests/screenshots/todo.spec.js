const { test, expect } = require('@playwright/test');

test.skip('Візуальний тест всієї сторінки TodoMVC', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  
  await page.fill('.new-todo', 'Перше завдання');
  await page.press('.new-todo', 'Enter');
  await page.fill('.new-todo', 'Друге завдання');
  await page.press('.new-todo', 'Enter');

  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('screenshots/todo-app/todomvc-main.png');
});

test.skip('Візуальний тест окремого компонента вводу завдань', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  
  // Використовуємо загальний контейнер .todoapp замість header.header
  const headerElement = page.locator('.todoapp');
  
  expect(await headerElement.screenshot()).toMatchSnapshot('screenshots/todo-app/todomvc-header.png');
});