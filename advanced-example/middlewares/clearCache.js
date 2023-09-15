const RedisClient = require('../services/redisClient');

module.exports = async (req, res, next) => {
	res.on('finish', function() {
		RedisClient.clearCash(req.user?.id);
	});
  next();
};
