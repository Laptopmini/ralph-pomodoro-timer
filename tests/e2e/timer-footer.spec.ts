import { expect, test } from "@playwright/test";

test.describe("Timer Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("footer is hidden by default", async ({ page }) => {
    const footer = page.locator('[data-testid="timer-footer"]');
    await expect(footer).not.toBeVisible();
  });

  test("footer appears on mouse movement", async ({ page }) => {
    const footer = page.locator('[data-testid="timer-footer"]');
    await expect(footer).not.toBeVisible();

    // Move mouse to trigger footer
    await page.mouse.move(200, 200);
    await expect(footer).toBeVisible();
  });

  test("footer contains Start, Pause, and Reset buttons", async ({ page }) => {
    // Move mouse to show footer
    await page.mouse.move(200, 200);

    const footer = page.locator('[data-testid="timer-footer"]');
    await expect(footer).toBeVisible();

    const startBtn = footer.locator('[data-testid="btn-start"]');
    const pauseBtn = footer.locator('[data-testid="btn-pause"]');
    const resetBtn = footer.locator('[data-testid="btn-reset"]');

    await expect(startBtn).toBeVisible();
    await expect(startBtn).toHaveText("Start");
    await expect(pauseBtn).toBeVisible();
    await expect(pauseBtn).toHaveText("Pause");
    await expect(resetBtn).toBeVisible();
    await expect(resetBtn).toHaveText("Reset");
  });

  test("footer hides when mouse movement stops", async ({ page }) => {
    const footer = page.locator('[data-testid="timer-footer"]');

    // Move mouse to show footer
    await page.mouse.move(200, 200);
    await expect(footer).toBeVisible();

    // Wait for the footer to auto-hide (typically 2-3 seconds of no movement)
    await expect(footer).not.toBeVisible({ timeout: 10000 });
  });

  test("footer stays visible when mouse hovers over it", async ({ page }) => {
    const footer = page.locator('[data-testid="timer-footer"]');

    // Move mouse to show footer
    await page.mouse.move(200, 200);
    await expect(footer).toBeVisible();

    // Get footer position and hover over it
    const box = await footer.boundingBox();
    expect(box).toBeTruthy();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }

    // Wait longer than the hide timeout — footer should remain visible
    await page.waitForTimeout(4000);
    await expect(footer).toBeVisible();
  });

  test("footer spans full window width", async ({ page }) => {
    await page.mouse.move(200, 200);

    const footer = page.locator('[data-testid="timer-footer"]');
    await expect(footer).toBeVisible();

    const box = await footer.boundingBox();
    const viewport = page.viewportSize();
    expect(box).toBeTruthy();
    expect(box?.width).toBeGreaterThanOrEqual((viewport?.width ?? 0) - 2);
  });
});
