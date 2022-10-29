import { model } from 'mongoose';
import TaskSchema, { ITask } from './task.schema';

const TaskModel = model<ITask>('Task', TaskSchema, 'tasks');

export default TaskModel;