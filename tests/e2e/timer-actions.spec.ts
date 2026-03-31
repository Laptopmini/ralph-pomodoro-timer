import { expect, test } from "@playwright/test";

test.describe("Timer Button Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  async function showFooter(page: import("@playwright/test").Page) {
    await page.mouse.move(200, 200);
    await expect(page.locator('[data-testid="timer-footer"]')).toBeVisible();
  }

  test("timer does not start automatically on page load", async ({ page }) => {
    const timer = page.locator('[data-testid="timer-display"]');
    await expect(timer).toHaveText("25:00");

    // Wait and confirm it hasn't changed
    await page.waitForTimeout(1500);
    await expect(timer).toHaveText("25:00");
  });

  test("Start button begins the countdown", async ({ page }) => {
    const timer = page.locator('[data-testid="timer-display"]');
    await expect(timer).toHaveText("25:00");

    await showFooter(page);
    await page.locator('[data-testid="btn-start"]').click();

    // Wait for at least one tick
    await page.waitForTimeout(1200);
    await expect(timer).not.toHaveText("25:00");
  });

  test("Pause button stops the countdown", async ({ page }) => {
    await showFooter(page);
    await page.locator('[data-testid="btn-start"]').click();

    // Let it tick
    await page.waitForTimeout(1200);

    await showFooter(page);
    await page.locator('[data-testid="btn-pause"]').click();

    const timer = page.locator('[data-testid="timer-display"]');
    const pausedValue = await timer.textContent();

    // Wait and confirm it hasn't changed
    await page.waitForTimeout(1500);
    await expect(timer).toHaveText(pausedValue ?? "");
  });

  test("Start button resumes after pause", async ({ page }) => {
    await showFooter(page);
    await page.locator('[data-testid="btn-start"]').click();

    await page.waitForTimeout(1200);

    await showFooter(page);
    await page.locator('[data-testid="btn-pause"]').click();

    const timer = page.locator('[data-testid="timer-display"]');
    const pausedValue = await timer.textContent();

    // Resume
    await showFooter(page);
    await page.locator('[data-testid="btn-start"]').click();

    await page.waitForTimeout(1200);
    await expect(timer).not.toHaveText(pausedValue ?? "");
  });

  test("Reset button sets timer back to 25:00 and pauses", async ({ page }) => {
    await showFooter(page);
    await page.locator('[data-testid="btn-start"]').click();

    // Let it tick
    await page.waitForTimeout(1200);

    await showFooter(page);
    await page.locator('[data-testid="btn-reset"]').click();

    const timer = page.locator('[data-testid="timer-display"]');
    await expect(timer).toHaveText("25:00");

    // Confirm it stays at 25:00 (paused)
    await page.waitForTimeout(1500);
    await expect(timer).toHaveText("25:00");
  });
});
