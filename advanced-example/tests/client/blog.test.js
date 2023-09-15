const CustomPage = require('../helpers/page');
const {
	BASE_URL,
	BLOGS_URL,
	NEW_BLOG_URL,
} = require('../constants');

describe('Blogs', () => {
	let currentPage = null;

	beforeEach(async () => {
		currentPage = await CustomPage.build();
		await currentPage.goto(BASE_URL);
	});

	afterEach(async () => {
		await currentPage.close();
	});

	describe('When logged in', () => {

		beforeEach(async () => {
			await currentPage.login();
			await currentPage.click('a.btn-floating');	
		});

		test('Should see blog create form', async () => {
			// Act
			const text = await currentPage.getPageElementText('form label');
			 
			// Assert
			expect(text).toBe('Blog Title');
		});

		describe('When using form and invalid input', () => {

			beforeEach(async () => {
				await currentPage.click('form button');
			});

			test('Submitting show validation text', async () => {
				// Arrange
				const validationMessage = 'You must provide a value';

				// Act
				const [
					titleValidationText,
					contentValidationText
				] = await Promise.all([
					currentPage.getPageElementText('.title .red-text'),
					currentPage.getPageElementText('.content .red-text')
				]);
	
				// Assert
				expect(titleValidationText).toBe(validationMessage);
				expect(contentValidationText).toBe(validationMessage);
			});
		});

		describe('When using form and valid input', () => {
			const content = {
				title: 'Test 1',
				description: 'Test description',
			};

			beforeEach(async () => {
				await currentPage.type('.title input', content.title);
				await currentPage.type('.content input', content.description); 
				await currentPage.click('form button');
			});

			test('after submit should redirect to preview page', async () => {
				// Arrange
				const validCheckText = 'Please confirm your entries';

				// Act
				const text = await currentPage.getPageElementText('h5');
	
				// Assert
				expect(text).toBe(validCheckText);
			});

			test('submitting then saving adds blog to index page', async () => {
				// Act
				await currentPage.click('button.green');
				await currentPage.waitFor('.card');
				const [
					cardTitle,
					cardContent
				] = await Promise.all([
					currentPage.getPageElementText('.card:last-child .card-title'),
					currentPage.getPageElementText('.card:last-child p')
				]);
	
				// Assert
				expect(cardTitle).toBe('Test 1');
				expect(cardContent).toBe('Test description');
			});
		});
	});

	describe('When not logged in', () => {

		test('User cannot get a list of blogs', async () => {
			// Act
			const result = await currentPage.evaluate(() => {
				return fetch('/api/blogs', {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title: 'New title',
						content: 'Test content',
					})
				}).then((res) => res.json());
			});

			// Assert
			expect(result).toEqual({ error: 'You must log in!' });
		});
	});
});
