// tests/e2e/todo.test.js
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Використовуємо стабільне офіційне демо Playwright для TodoMVC
  await page.goto('https://demo.playwright.dev/todomvc/');
});

test('Додавання нового завдання до списку', async ({ page }) => {
  await page.fill('.new-todo', 'Вивчити Playwright E2E');
  await page.press('.new-todo', 'Enter');
  
  const todoItem = page.locator('.todo-list li');
  await expect(todoItem).toHaveCount(1);
  await expect(todoItem).toHaveText('Вивчити Playwright E2E');
});

test('Перемикання статусу виконання завдання', async ({ page }) => {
  await page.fill('.new-todo', 'Здати лабораторну роботу');
  await page.press('.new-todo', 'Enter');
  
  // Клік по чекбоксу виконання
  await page.click('.toggle');
  
  const completedItem = page.locator('.todo-list li.completed');
  await expect(completedItem).toBeVisible();
});

test('Редагування існуючого завдання', async ({ page }) => {
  await page.fill('.new-todo', 'Старе завдання');
  await page.press('.new-todo', 'Enter');

  // Подвійний клік для редагування
  await page.dblclick('.todo-list li label');
  
  const editInput = page.locator('.todo-list li.editing .edit');
  await editInput.fill('Оновлене завдання');
  await editInput.press('Enter');

  await expect(page.locator('.todo-list li label')).toHaveText('Оновлене завдання');
});

test('Видалення завдання зі списку', async ({ page }) => {
  await page.fill('.new-todo', 'Завдання на видалення');
  await page.press('.new-todo', 'Enter');

  // Наведення на елемент для появи кнопки видалення (destroy)
  await page.hover('.todo-list li');
  await page.click('.destroy');

  await expect(page.locator('.todo-list li')).toHaveCount(0);
});