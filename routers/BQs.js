import { Router } from 'express';
import adhoc from '../utils/adhoc.js';
import createBQ from '../utils/createBQ.js';
import umlToSchema from '../utils/umlToSchemas.js';
import umlToBQ from '../utils/umlToBQ.js';

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

bqRouter.post('/generate-bqs', async (req, res) => {
	let { umlText } = req.body;
	// create schemas from uml text
	// let umlToSchemaResponse = await umlToSchema(umlText);
	// let schemaIds = umlToSchemaResponse.json();
	// get bq definitions
	let umlToPossibleQueries = await umlToBQ(umlText);
	res.status(200).json(umlToPossibleQueries);
});

export default bqRouter;
