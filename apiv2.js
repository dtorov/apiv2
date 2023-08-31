const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router')
const ErrorMiddleware = require('./middlewares/ErrorMiddleware')
require('dotenv').config()



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(process?.env?.API_BASE_PATH, router);
app.use(ErrorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process?.env?.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(process?.env?.API_PORT || 3000, () => { console.log(` API is started on port: ${process?.env?.API_PORT}`) })
    } catch (e) {
        console.log(e)
    }
}

start()