import { chromium } from '@playwright/test';

export async function launchBrowserWithFakeMedia(filePath) {
    console.log('[launchBrowser] Using fake video from:', filePath);
  const browser = await chromium.launch({
    args: ['--disable-web-security',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
            `--use-file-for-fake-video-capture=${filePath}`]
  });
  
console.log()

  const context = await browser.newContext();
  const page = await context.newPage();
  
  return { browser, context, page };
}