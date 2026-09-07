import { expect, test, type Page } from '@playwright/test';

const origin = 'http://localhost:4173';

function deferred() {
	let resolve!: () => void;
	const promise = new Promise<void>((done) => {
		resolve = done;
	});
	return { promise, resolve };
}

async function switchLocale(page: Page, locale: 'en' | 'ko') {
	await page.getByRole('button', { name: 'Change language' }).click();
	await page.getByRole('menuitem', { name: locale === 'ko' ? '한국어' : 'English' }).click();
	await expect(page.locator('html')).toHaveAttribute('lang', locale);
}

async function openSearch(page: Page, query: string) {
	await page.getByRole('button', { name: /Search documentation|문서 검색/ }).click();
	const dialog = page.getByRole('dialog');
	await expect(dialog.getByRole('textbox')).toBeFocused();
	await dialog.getByRole('textbox').fill(query);
	return dialog;
}

async function expectConfigResult(page: Page, locale: 'en' | 'ko') {
	// This term occurs in document bodies, not sidebar titles. Requiring a
	// highlighted excerpt prevents the dev/title fallback from passing.
	const dialog = await openSearch(page, 'lily-pad.config.ts');
	const title = locale === 'ko' ? '사이트 설정' : 'Site Config';
	await expect(dialog.getByRole('button', { name: new RegExp(`^${title}`) })).toBeVisible();
	await expect(dialog.locator('mark').first()).toBeVisible();
	await expect(
		dialog.getByText(locale === 'ko' ? 'Site Config' : '사이트 설정', { exact: true })
	).toHaveCount(0);
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
}

test('searches Korean after switching before the first search and keeps the result URL localized', async ({
	page
}) => {
	await page.goto(`${origin}/docs`);
	await page.locator('html').evaluate((html) => (html.dataset.navigationProbe = 'preserved'));
	await switchLocale(page, 'ko');
	await expect(page.locator('html')).toHaveAttribute('data-navigation-probe', 'preserved');

	const dialog = await openSearch(page, '문서');
	await expect(dialog.locator('mark').first()).toBeVisible();
	await expect(dialog.getByText('Site Config', { exact: true })).toHaveCount(0);
	await dialog.getByRole('textbox').fill('lily-pad.config.ts');
	const result = dialog.getByRole('button', { name: /^사이트 설정/ });
	await expect(result.locator('mark').first()).toBeVisible();
	await result.click();
	await expect(page).toHaveURL(/\/ko\/docs\/reference\/site-config\/?$/);
	await expect(page.getByRole('heading', { name: '사이트 설정', exact: true })).toBeVisible();
});

test('reinitializes a warm index in both directions and on back/forward navigation', async ({
	page
}) => {
	await page.goto(`${origin}/docs`);
	await expectConfigResult(page, 'en');
	await page.locator('html').evaluate((html) => (html.dataset.navigationProbe = 'preserved'));
	await switchLocale(page, 'ko');
	await expectConfigResult(page, 'ko');

	await page.goBack();
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	await expectConfigResult(page, 'en');
	await page.goForward();
	await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
	await expectConfigResult(page, 'ko');
	await switchLocale(page, 'en');
	await expectConfigResult(page, 'en');
	await expect(page.locator('html')).toHaveAttribute('data-navigation-probe', 'preserved');
});

test('uses the Korean index when entering a Korean URL directly', async ({ page }) => {
	await page.goto(`${origin}/ko/docs`);
	await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
	await expectConfigResult(page, 'ko');
	await switchLocale(page, 'en');
	await expectConfigResult(page, 'en');
});

test('runs the latest query after a slow initial Pagefind import', async ({ page }) => {
	const requested = deferred();
	const release = deferred();
	await page.route('**/pagefind/pagefind.js', async (route) => {
		requested.resolve();
		await release.promise;
		await route.continue();
	});
	await page.goto(`${origin}/ko/docs`);
	const dialog = await openSearch(page, 'obsolete query');
	try {
		await requested.promise;
		await dialog.getByRole('textbox').fill('lily-pad.config.ts');
	} finally {
		release.resolve();
	}
	await expect(dialog.getByRole('button', { name: /^사이트 설정/ })).toBeVisible();
	await expect(dialog.locator('mark').first()).toBeVisible();
});

test('keeps localized title search usable when the index is missing', async ({ page }) => {
	await page.route('**/pagefind/pagefind.js', (route) => route.abort());
	await page.goto(`${origin}/ko/docs`);
	const dialog = await openSearch(page, '사이트 설정');
	await expect(dialog.getByRole('button', { name: /^사이트 설정/ })).toBeVisible();
	await expect(dialog.locator('mark')).toHaveCount(0);
	await dialog.getByRole('button', { name: /^사이트 설정/ }).click();
	await expect(page).toHaveURL(/\/ko\/docs\/reference\/site-config\/?$/);
});

// Deliberately delay result hydration, after search() has already resolved.
// This exercises stale-result handling independently of network/cache timing.
async function mockDelayedResult(page: Page) {
	await page.route('**/pagefind/pagefind.js', (route) =>
		route.fulfill({
			contentType: 'application/javascript',
			body: `
				let language;
				export function destroy() { language = undefined; }
				export function init() { language = document.documentElement.lang; }
				export async function search(query) {
					const locale = language;
					return { results: [{
						id: locale + query,
						async data() {
							if (locale === 'ko' && query === 'slow') {
								document.documentElement.dataset.searchPending = 'true';
								await new Promise(resolve =>
									window.addEventListener('release-search', resolve, { once: true }));
								document.documentElement.dataset.searchSettled = 'true';
							}
							return {
								url: (locale === 'ko' ? '/ko' : '') + '/docs/reference/site-config.html',
								meta: { title: locale === 'ko' ? '사이트 설정' : 'Site Config' },
								excerpt: '<mark>' + query + '</mark>'
							};
						}
					}] };
				}
			`
		})
	);
}

async function releaseDelayedResult(page: Page) {
	await page.evaluate(() => window.dispatchEvent(new Event('release-search')));
	await expect(page.locator('html')).toHaveAttribute('data-search-settled', 'true');
	// Let the completed promise and the Svelte update flush before asserting
	// that a stale response did NOT change the visible results.
	await page.evaluate(
		() =>
			new Promise<void>((resolve) => {
				requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
			})
	);
}

test('does not restore an old result after the query is cleared', async ({ page }) => {
	await mockDelayedResult(page);
	await page.goto(`${origin}/ko/docs`);
	const dialog = await openSearch(page, 'slow');
	await expect(page.locator('html')).toHaveAttribute('data-search-pending', 'true');
	await dialog.getByRole('textbox').fill('');
	await releaseDelayedResult(page);
	await expect(dialog.getByRole('textbox')).toHaveValue('');
	await expect(dialog.locator('mark')).toHaveCount(0);
});

test('does not restore a result from a closed search session', async ({ page }) => {
	await mockDelayedResult(page);
	await page.goto(`${origin}/ko/docs`);
	const dialog = await openSearch(page, 'slow');
	await expect(page.locator('html')).toHaveAttribute('data-search-pending', 'true');
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await openSearch(page, '');
	await releaseDelayedResult(page);
	await expect(dialog.getByRole('textbox')).toHaveValue('');
	await expect(dialog.locator('mark')).toHaveCount(0);
});

test('does not overwrite a new locale with a delayed result from the old locale', async ({
	page
}) => {
	await mockDelayedResult(page);
	await page.goto(`${origin}/docs`);
	await switchLocale(page, 'ko');
	const dialog = await openSearch(page, 'slow');
	await expect(page.locator('html')).toHaveAttribute('data-search-pending', 'true');
	await page.goBack();
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	await expect(dialog.getByRole('button', { name: /^Site Config/ })).toBeVisible();
	await releaseDelayedResult(page);
	await expect(dialog.getByRole('button', { name: /^Site Config/ })).toBeVisible();
	await expect(dialog.getByText('사이트 설정', { exact: true })).toHaveCount(0);
});
