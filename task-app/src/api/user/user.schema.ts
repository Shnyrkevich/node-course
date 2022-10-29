import { Schema } from 'mongoose';
import validator from 'validator';

export interface IUser {
	name: string,

	age?: number,

	email: string,

	password: string
}

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		minlength: [1, `Can't be an empty string`],
		maxlength: 255,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		default: 0,
		min: [0, `Can't be a negative number`]
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: [7, 'Password should have more than 6 characters'],
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password should not be equal to "password"');
			}
		}
	}
});

export default UserSchema;
