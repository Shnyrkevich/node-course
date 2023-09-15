const CustomPage = require('../helpers/page');
const { BASE_URL } = require('../constants');

describe('Client header', () => {
	let currentPage = null;

	beforeEach(async () => {
		currentPage = await CustomPage.build();
		await currentPage.goto(BASE_URL);
	});

	afterEach(async () => {
		await currentPage.close();
	});

	test('Header title check', async () => {
		// Arrange
		const title = 'Blogster';

		// Act
		const text = await currentPage.getPageElementText('a.brand-logo');
		 
		// Assert
		expect(text).toBe(title);
	});

	test('Clicking auth button workflow', async () => {
		// Act
		await currentPage.click('.right a');
		const pageURL = await currentPage.url();
			
		// Assert
		expect(pageURL).toMatch(/accounts\.google\.com/);
	});

	test('Should shown logout button after sign in', async () => {
		// Arrange
		await currentPage.login();

		// Act
		await currentPage.waitForSelector('a[href="/auth/logout"]');
		const logoutBtnText = await currentPage.getPageElementText('a[href="/auth/logout"]');

		// Assert
		expect(logoutBtnText).toBe('Logout');
	});
});
