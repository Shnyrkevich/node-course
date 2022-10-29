import { Schema } from 'mongoose';

export interface ITask {
	description: string,

	completed?: boolean
}

const TaskSchema = new Schema<ITask>({
	description: {
		type: String,
		trim: true,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

export default TaskSchema;
