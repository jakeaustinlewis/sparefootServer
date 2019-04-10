const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/ping', (req, res) => {
	res.send('1');
});

db.sync()
.then(() => {
	app.listen(PORT);
	console.log(`listening on port ${PORT}...`);
});


