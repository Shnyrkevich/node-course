const puppeteer = require('puppeteer');
const FakeAppAuth = require('./authHelper');
const createUser = require('./userFactory');
const { BASE_URL, BLOGS_URL } = require('../constants');

class CustomPage {
	page;
	user;
	authorizer;

	constructor(page) {
		this.page = page;
	}

	static async build() {
		const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
		const page = await browser.newPage();
		const customPage = new CustomPage(page);
		
		return new Proxy(customPage, {
			get: function(target, property) {
				return customPage[property] || browser[property] || page[property];
			},
		});
	}

	async initCreds() {
		if (!this.user) {
			this.user = await createUser();
		}
		if (!this.authorizer) {
			this.authorizer = new FakeAppAuth(this.user._id.toString());
		}
	}

	async login() {
		await this.initCreds();
		await Promise.all([
			this.page.setCookie({ name: 'session', value: this.authorizer.session }),
			this.page.setCookie({ name: 'session.sig', value: this.authorizer.sig })
		]);
		await this.page.goto(BLOGS_URL);
	}

	getPageElementText(sel) {
		if (!sel) return;
		return this.page.$eval(sel, el => el.innerHTML);
	}
}

module.exports = CustomPage;
