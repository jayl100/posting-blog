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
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
	optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.listen(process.env.PORT)
console.log(`Server running on http://localhost: ${ process.env.PORT }`);

app.use('/posts', postRouter);
app.use('/users', loginRouter);
app.use('/mypage', mypageRouter);

(async() => {
	try {
		await db.sequelize.authenticate();
		// await db.sequelize.sync({force: true});
		console.log('DB connection successful');
	} catch (err) {
		console.error(err);
	}
})();

app.use(errorHandler);
