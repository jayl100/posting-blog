const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const route = require('./routes/route');

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT;

app.use('/', route);

app.listen(port, function () {
	console.log('Example app listening on port : ' + port);
});