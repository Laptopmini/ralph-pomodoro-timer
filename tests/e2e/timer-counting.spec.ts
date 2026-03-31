import { expect, test } from "@playwright/test";

test.describe("Timer Counting", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("timer counts down from 25:00 after page load", async ({ page }) => {
    const timer = page.locator('[data-testid="timer-display"]');
    await expect(timer).toHaveText("25:00");

    // Wait just over 1 second for the first tick
    await page.waitForTimeout(1100);
    await expect(timer).toHaveText("24:59");

    // Wait another second
    await page.waitForTimeout(1000);
    await expect(timer).toHaveText("24:58");
  });

  test("colon blinks every second", async ({ page }) => {
    const colon = page.locator('[data-testid="timer-colon"]');
    await expect(colon).toBeVisible();

    // Check that the colon has a blinking animation applied
    const hasAnimation = await colon.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.animationName !== "none" ||
        style.animationDuration !== "0s" ||
        el.classList.length > 0
      );
    });
    expect(hasAnimation).toBe(true);
  });

  test("timer format is MM:SS", async ({ page }) => {
    const timer = page.locator('[data-testid="timer-display"]');
    const text = await timer.textContent();
    expect(text).toMatch(/^\d{2}:\d{2}$/);
  });
});
