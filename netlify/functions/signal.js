const signals = {};
exports.handler = async (event, context) => {
	if (event.httpMethod === 'POST') {
		// 獲取發送過來的信令數據
		const body = JSON.parse(event.body);
		const { clientId, signalData } = body;

		// 將信令數據存儲到 signals 中，使用 clientId 作為鍵
		signals[clientId] = signalData;

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Signal stored successfully' })
		};
	} else if (event.httpMethod === 'GET') {
		// 獲取指定 clientId 的信令數據
		const clientId = event.queryStringParameters.clientId;

		if (signals[clientId]) {
			return {
				statusCode: 200,
				body: JSON.stringify({ signalData: signals[clientId] })
			};
		} else {
			return {
				statusCode: 404,
				body: JSON.stringify({ message: 'No signal found for the given clientId' })
			};
		}
	} else {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: 'Method Not Allowed' })
		};
	}
};