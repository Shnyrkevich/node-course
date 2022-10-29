import mongoose from 'mongoose';
import config from '../config';

export default async () => {
	try {
		await mongoose.connect(config.mongoUrl);
		console.log('MOngoDB connected successfully')
	} catch(e) {
		console.log('Error: mongoDB connection')
	}
};
