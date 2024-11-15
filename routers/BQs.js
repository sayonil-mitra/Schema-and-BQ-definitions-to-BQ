import { Router } from 'express';
import adhoc from '../utils/adhoc.js';
import createBQ from '../utils/createBQ.js';

const bqRouter = Router();

bqRouter.post('/adhoc', async (req, res) => {
	let { query } = req.body;
	// extract bearer token
	let token = req.headers.authorization?.split('Bearer ')[1];
	let { statusCode, data } = await adhoc(query, token);
	res.json(data).status(statusCode);
});

bqRouter.post('/create-bq', async (req, res) => {
	let { query = '', queryName = '', universeId = '' } = req.body;
	// extract bearer token
	let token = req.headers.authorization?.split('Bearer ')[1];
	let { statusCode, data } = await createBQ(
		query,
		queryName,
		universeId,
		token
	);
	res.json(data).status(statusCode);
});

export default bqRouter;
