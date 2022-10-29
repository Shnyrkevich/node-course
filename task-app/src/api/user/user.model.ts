import { model } from 'mongoose';
import UserSchema, { IUser } from './user.schema';

const UserModel = model<IUser>('User', UserSchema, 'users');

export default UserModel;