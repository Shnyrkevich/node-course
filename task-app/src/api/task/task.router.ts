import { Router } from "express";
import { Types } from "mongoose";
import { taskFieldsToUpdate } from "../../types";
import TaskModel from "./task.model";
import { ITask } from "./task.schema";

const TaskRouter = Router();

TaskRouter.post('/', async (req, res) => {
	try {
		const data: ITask = await TaskModel.create(req.body);
		res.status(201).send(data);		
	} catch(e) {
		res.status(400).send(`An error occured while created task: ${e.message}`);
	}
});

TaskRouter.get('/', async (req, res) => {
	try {
		const data = await TaskModel.find({});
		res.status(200).send(data);		
	} catch(e) {
		res.status(500).send(`An error occured while find tasks: ${e.message}`);
	}
});

TaskRouter.get('/:id', async (req, res) => {
	try {
		const data: ITask = await TaskModel.findById(req.params.id);
		res.status(200).send(data);		
	} catch(e) {
		res.status(500).send(`An error occured while found task by id: ${req.params.id} ${e.message}`);
	}
});

TaskRouter.patch('/:id', async (req, res) => {
	try {
		const udpateFields = Object.keys(req.body);
		const isUpdateAllowed = udpateFields.every((key: string) => taskFieldsToUpdate.includes(key));

		if (!isUpdateAllowed) {
			return res.status(400).send({ error: 'Invalid update' });
		}

		const data: ITask = await TaskModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!data) {
			return res.status(404).send();
		}

		res.status(200).send(data);		
	} catch(e) {
		res.status(400).send(`An error occured while updating task by id: ${req.params.id} ${e.message}`);
	}
});

TaskRouter.delete('/:id', async (req, res) => {
	try {
		await TaskModel.deleteOne({ _id: new Types.ObjectId(req.params.id) });
		res.status(200).send(`Task with id: ${req.params.id}, was deleted successfully`);		
	} catch(e) {
		res.status(500).send(`An error occured while deleating task with id: ${req.params.id}, ${e.message}`);
	}
});

export default TaskRouter;