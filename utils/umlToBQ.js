import axios from 'axios';
import { CONSTANTS } from '../constants/constant.js';

export default async function umlToBQ(umlText = '') {
	try {
		// step 1: send uml to file id
		const umlToFildIdUrl = `${CONSTANTS.BaseUrl}/${CONSTANTS.EndPointAgentFileId}`;
		const requestBodyUmlToFildId = {
			user_id: 'Gaian@123',
			assistant_id: CONSTANTS.AssistantIdUmlToQueries,
			thread_id: '',
			file_id: '',
			input: `${umlText}.Give the output queries in a file. give me the atleast 20 queries`,
			model: '',
		};
		let umlFildId;

		// retry until a fild id is received
		while (!umlFildId) {
			let umlToFileIdRes = await axios.post(
				umlToFildIdUrl,
				requestBodyUmlToFildId,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			umlFildId = umlToFileIdRes.data?.messages[0]?.file_id;
		}

		// step 2: send fild id to get possible queries
		const umlFileIdToQueriesUrl = `${CONSTANTS.BaseUrl}/${CONSTANTS.EndPointAgentResponse}?file_id=${umlFildId}`;
		let umlFileIdToQueriesResponse = await axios.get(umlFileIdToQueriesUrl);
		let possibleQueriesJson = umlFileIdToQueriesResponse.data;
		console.log('got possible queries');
		return {
			statusCode: umlFileIdToQueriesResponse.status,
			data: possibleQueriesJson,
		};
		// // step 3: send possible queries to agent for conversion to bq
		// const queryToBqAgentUrl = umlToFildIdUrl; // since they will use same urls
		// const requestBodyForBqDefinitions = {
		// 	user_id: 'Gaian@123',
		// 	assistant_id: CONSTANTS.AssistantIdSqlToBq,
		// 	thread_id: '',
		// 	file_id: '',
		// 	input: possibleQueriesJson,
		// 	model: '',
		// };
		// const possibleQueriesToBqResponse = await axios.post(
		// 	queryToBqAgentUrl,
		// 	requestBodyForBqDefinitions
		// );
		// const bqDefinitions = possibleQueriesToBqResponse.data;
		// console.log('got bqs');
		// return bqDefinitions;
	} catch (error) {
		console.log('bq generation error: ', error);
	}
}
