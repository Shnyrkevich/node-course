import { Router } from "express";
import { Types } from "mongoose";
import UserModel from "./user.model";
import { IUser } from "./user.schema";
import { userFieldsToUpdate } from '../../types';

const UserRouter = Router();

UserRouter.post('/', async (req, res) => {
	try {
		const data: IUser = await UserModel.create(req.body);
		res.status(201).send(data);		
	} catch(e) {
		res.status(400).send(`An error occured while created user: ${e.message}`);
	}
});

UserRouter.get('/', async (req, res) => {
	try {
		const data = await UserModel.find({});
		res.status(200).send(data);		
	} catch(e) {
		res.status(400).send(`An error occured while find users: ${e.message}`);
	}
});

UserRouter.get('/:id', async (req, res) => {
	try {
		const data: IUser = await UserModel.findById(req.params.id);
		res.status(200).send(data);		
	} catch(e) {
		res.status(500).send(`An error occured while found user by id: ${req.params.id} ${e.message}`);
	}
});

UserRouter.patch('/:id', async (req, res) => {
	try {
		const udpateFields = Object.keys(req.body);
		const isUpdateAllowed = udpateFields.every((key: string) => userFieldsToUpdate.includes(key));

		if (!isUpdateAllowed) {
			return res.status(400).send({ error: 'Invalid update' });
		}

		const data: IUser = await UserModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!data) {
			return res.status(404).send();
		}

		res.status(200).send(data);		
	} catch(e) {
		res.status(400).send(`An error occured while updating user by id: ${req.params.id} ${e.message}`);
	}
});

UserRouter.delete('/:id', async (req, res) => {
	try {
		await UserModel.deleteOne({ _id: new Types.ObjectId(req.params.id) });
		res.status(201).send(`User with id: ${req.params.id}, was deleted successfully`);		
	} catch(e) {
		res.status(500).send(`An error occured while deleating user with id: ${req.params.id}, ${e.message}`);
	}
});

export default UserRouter;