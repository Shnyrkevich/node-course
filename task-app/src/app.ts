import express from 'express';
import dbConnection from './db/mongoose';
import config from './config';

import UserRouter from './api/user/user.router';
import TaskRouter from './api/task/task.router';

const app = express();

app.use(express.json());

app.use('/users', UserRouter);
app.use('/tasks', TaskRouter);

app.listen(config.port, async () => {
	console.log(`Server is started on route ${config.port}`);
	await dbConnection();
});

