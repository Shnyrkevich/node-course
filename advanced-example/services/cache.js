const mongoose = require('mongoose');
const RedisClient = require('./redisClient');

const exec = mongoose.Query.prototype.exec;
const client = RedisClient.getInstance();

mongoose.Query.prototype.cache = function(options = { key: null }) {
	this._shouldUseCache = true;
	this._cacheKey = options.key || '';
	return this;
};

mongoose.Query.prototype.exec = async function() {
	if (!this._shouldUseCache) return exec.apply(this, arguments);

	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name })
	);
	const	cacheValue = await client.hget(this._cacheKey, key);
	if (cacheValue) {
		const doc = JSON.parse(cacheValue);
		return Array.isArray(doc)
			? doc.map(d => new this.model(d))
			: new this.model(doc);
	}

	const result = await exec.apply(this, arguments);
	client.hset(this._cacheKey, key, JSON.stringify(result), 'EX', 10);
	return result;
}
