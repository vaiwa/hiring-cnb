import { test, expect } from '@playwright/test'

test('has page title', async ({ page }) => {
  await page.goto('/')

  expect(await page.locator('h1').innerText()).toContain('Task ČNB')
})

test('has currency converter title', async ({ page }) => {
  await page.goto('/')

  expect(await page.locator('h2').innerText()).toContain('Currency Converter')
})
