const Keygrip = require('keygrip');
const Buffer = require('safe-buffer').Buffer; // An easy way to parse cookies
const keys = require('../../config/keys');

class FakeAppAuth {
	session;
	sig;
	keygrip;

	constructor(userId) {
		this.keygrip = new Keygrip([keys.cookieKey]);
		this.session = this.createSessionString(userId);
		this.sig = this.generateSigCookie();
	}

	generateSigCookie() {
		return this.keygrip.sign('session=' + this.session);
	}

	createSessionString(userId) {
		const sessionObject = { passport: { user: userId } };
		return Buffer.from(
			JSON.stringify(sessionObject)
		).toString('base64');
	}
}

module.exports = FakeAppAuth;
