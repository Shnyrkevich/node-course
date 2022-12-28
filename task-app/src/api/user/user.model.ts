import { model } from 'mongoose';
import UserSchema, { IUser } from './user.schema';

const UserModel = model<IUser>('User', UserSchema, 'users');

console.log('ujif lehasdjansnmdlak!!!')
// Сообщение дибила

export default UserModel;