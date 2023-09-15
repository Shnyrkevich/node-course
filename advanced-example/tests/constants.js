const BASE_URL = `http://localhost:${process.env.PORT}`;

module.exports = {
	BASE_URL,
	NEW_BLOG_URL: `${BASE_URL}/blogs/new`,
	BLOGS_URL: `${BASE_URL}/blogs`,
};