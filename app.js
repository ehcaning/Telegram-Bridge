const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', async function (req, res) {
	try {
		const result = await axios({
			timeout: 5000,
			url: 'https://api.telegram.org' + req.url,
			method: req.method,
			params: req.params,
			data: req.body,
		});

		res.send(result.data);
	} catch (err) {
		res.send(err.response.data);
	}
});

app.listen(port, () => {
	console.log(`Telegram Bridge listening at http://127.0.0.1:${port}`);
});
