const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const errorHandler = require('./middlewares/errorHandler');
const app = express();
const cors = require('cors')
const loginRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const mypageRouter = require('./routes/mypageRouter');
const db = require('./models');

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT)
console.log(`Server running on http://localhost: ${ process.env.PORT }`);

app.use('/posts', postRouter);
app.use('/users', loginRouter);
app.use('/mypage', mypageRouter);

app.use(errorHandler);

(async() => {
	try {
		await db.sequelize.authenticate();
		// await db.sequelize.sync();
		console.log('DB connection successful');
	} catch (err) {
		console.error(err);
	}
})();
