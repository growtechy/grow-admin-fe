const axios = require('axios');

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const routeUrl = `${process.env.NODE_ENV == 'local' ? process.env.ENDPOINT_URL_DEV : process.env.ENDPOINT_URL_PROD}`;

const getAllSentMessages = async (req, res) => {
	try {
		const config = {
			method: 'GET',
			url: `${routeUrl}/allsentmessages`,
			headers: myHeader()
		};

		const result = await axios(config);

		const data = result.data;

		res.render('./pages/home/allsentmessages', data);
	} catch (error) {
		if (error.response) {
			res.render('./pages/error/400', { error: error.response.data.message });
		} else {
			res.render('./pages/error/400', { error: error.message });
		}
	}
};

function myHeader() {
	var headers = {
		Authorization: `Bearer ${localStorage.token}`
	};

	return headers;
}

module.exports = { getAllSentMessages };
