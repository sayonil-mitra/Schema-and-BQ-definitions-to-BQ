import axios from 'axios';
import { CONSTANTS } from '../constants/constant.js';

export default async function adhoc(query = '', token = CONSTANTS.Token) {
	const adhocUrl = `${CONSTANTS.BaseUrl}/${CONSTANTS.EndpointAdhoc}`;
	const requestBody = {
		type: 'TIDB',
		definition: query,
	};

	try {
		let adhocResponse = await axios.post(adhocUrl, requestBody, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		let adhocData = adhocResponse.data?.model?.data;
		return {
			statusCode: adhocResponse.status,
			data: adhocData,
		};
	} catch (error) {
		console.log('Adhoc error:', error.response.data?.subErrors[0]);
		return {
			statusCode: error.status || 500,
			data: error?.data?.subErrors,
		};
	}
}
