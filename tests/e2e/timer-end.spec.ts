import { expect, test } from "@playwright/test";

test.describe("Timer End", () => {
  test("plays a sound when timer reaches 00:00", async ({ page }) => {
    await page.clock.install({ time: new Date() });
    await page.goto("/");

    // Intercept audio play calls
    await page.evaluate(() => {
      const w = window as Window & { __audioPlayed?: boolean };
      w.__audioPlayed = false;
      HTMLAudioElement.prototype.play = () => {
        const win = window as Window & { __audioPlayed?: boolean };
        win.__audioPlayed = true;
        return Promise.resolve();
      };
    });

    // Fast-forward 25 minutes
    await page.clock.runFor("25:00");

    const timer = page.locator('[data-testid="timer-display"]');
    await expect(timer).toHaveText("00:00");

    const audioPlayed = await page.evaluate(
      () => (window as Window & { __audioPlayed?: boolean }).__audioPlayed,
    );
    expect(audioPlayed).toBe(true);
  });

  test("colon stops blinking when timer reaches 00:00", async ({ page }) => {
    await page.clock.install({ time: new Date() });
    await page.goto("/");

    // Intercept audio so it doesn't actually play
    await page.evaluate(() => {
      HTMLAudioElement.prototype.play = () => Promise.resolve();
    });

    // Fast-forward 25 minutes
    await page.clock.runFor("25:00");

    const timer = page.locator('[data-testid="timer-display"]');
    await expect(timer).toHaveText("00:00");

    const colon = page.locator('[data-testid="timer-colon"]');
    // Colon should not be animating
    const hasAnimation = await colon.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.animationName !== "none" && style.animationDuration !== "0s";
    });
    expect(hasAnimation).toBe(false);
  });
});
