import { expect, test } from "@playwright/test";

test.describe("Timer Value Display", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders 25:00 as the initial timer value", async ({ page }) => {
    const timer = page.locator('[data-testid="timer-display"]');
    await expect(timer).toBeVisible();
    await expect(timer).toHaveText("25:00");
  });

  test("timer value fills the viewport without causing scroll", async ({ page }) => {
    const timer = page.locator('[data-testid="timer-display"]');
    await expect(timer).toBeVisible();

    const viewportSize = page.viewportSize();
    const box = await timer.boundingBox();
    expect(box).toBeTruthy();

    const viewportWidth = viewportSize?.width ?? 0;
    expect(box?.width).toBeGreaterThan(viewportWidth * 0.5);

    const bodyScrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const windowHeight = await page.evaluate(() => window.innerHeight);
    expect(bodyScrollHeight).toBeLessThanOrEqual(windowHeight + 1);
  });
});
