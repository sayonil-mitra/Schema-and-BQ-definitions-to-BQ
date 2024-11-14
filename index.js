import e from 'express';
import bqRouter from './routers/BQs.js';

const app = e();
const PORT = 3000;

app.use(e.json());
app.use(bqRouter);

app.listen(PORT, () => {
	console.log(`Node js service is running on ${PORT}!`);
});
