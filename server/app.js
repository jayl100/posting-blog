const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors')
const loginRouter = require('./routes/loginRoute');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const db = require('./models');

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT)
console.log(`Server running on http://localhost: ${ process.env.PORT }`);

db.sequelize.authenticate()
	.then(() => db.sequelize.sync())
	.then(() => {
		console.log('DB connection successful');
	})
	.catch((err) => console.error(err));

app.use('/posts', postRouter);
app.use('/login', loginRouter);
app.use('/users', userRouter);
