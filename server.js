require('dotenv').config()
require("./helpers/shared");
const express = require('express')
const cors = require('cors');
const { connectDb } = require("./db/connect-db");
connectDb()

const app = express()
app.use(express.json())
app.use(cors());


// Auth router
const authRouter = require('./routers/auth.router')
app.use('/api', authRouter)




const { port } = require("./helpers/shared");
app.listen(port, () => {
    console.log(`server ${port}-portda ishga tushdi`);
})