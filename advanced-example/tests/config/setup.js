const mongoose = require('mongoose');
require('../../models/User');

jest.setTimeout(30000);

const keys = require('../../config/keys');
 
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
afterAll(async () => {
  await mongoose.disconnect();
});