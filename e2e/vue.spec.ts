import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('Check header text', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.app > header > h2')).toHaveText('Todo-Liste')
})

test('Add item', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox').fill('New todo')
  await page.getByRole('textbox').press('Enter')
  await expect(page.locator('.app > main > .todo-item > .todo-item-text').last()).toHaveText(
    'New todo'
  )
  await expect(page.locator('.app > main > div.todo-item > .todo-item-text')).toHaveCount(1)
})

test('Complete item', async ({ page }) => {
  await page.goto('/')
  await page.locator('.app > main > .todo-item > input').check()
  await expect(page.locator('.app > main > .todo-item > .todo-item-text')).toHaveCSS(
    'text-decoration',
    'line-through'
  )
})

test('Delete item', async ({ page }) => {
  await page.goto('/')
  await page.locator('.app > main > div > button').click()
  await expect(page.locator('.app > main > div > span')).toHaveCount(0)
})
