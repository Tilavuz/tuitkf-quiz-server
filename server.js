require('dotenv').config()
require("./helpers/shared");
require("./bot/bot");
const express = require('express')
const cors = require('cors');
const { connectDb } = require("./db/connect-db");
connectDb()

const app = express()
app.use(express.json())
app.use(cors());
app.use('/uploads', express.static('uploads'))


// Auth router
const authRouter = require('./routers/auth.router')
app.use('/api', authRouter)

// User router
const userRouter = require('./routers/user.router')
app.use('/api', userRouter)

// Science router
const scienceRouter = require('./routers/science.router')
app.use('/api', scienceRouter)

// Question router
const questionRouter = require('./routers/question.router')
app.use('/api', questionRouter)

// Test router
const testRouter = require('./routers/test.router')
app.use('/api', testRouter)

// Session router
const sessionRouter = require('./routers/session.router')
app.use('/api', sessionRouter)

// Statistics router
const statisticsRouter = require('./routers/statistics.router')
app.use('/api', statisticsRouter)

// News router
const newsRouter = require('./routers/news.router')
app.use('/api', newsRouter)

const { port } = require("./helpers/shared");
app.listen(port, () => {
    console.log(`server ${port}-portda ishga tushdi`);
})