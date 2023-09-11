const express = require('express');
const crypto = require('crypto');

const app = express();

function doWork() {
	crypto.pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
		console.log('derKey', derivedKey);
});
}

app.get('/', (req, res) => {
	doWork();
	doWork();
	res.send('hi!!!');
});

app.listen(3000, () => {
	console.log('server is started on port 3000');
});