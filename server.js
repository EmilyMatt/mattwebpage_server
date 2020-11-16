// Require Dependencies
const express = require('express')
require('mandatoryenv').load()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const cron = require('node-cron')
const { imsAPI_15cities } = require('./controllers/forecast_api')
const { cleanDatabase } = require('./controllers/database_mongo')
const { connectpsql } = require('./controllers/database_postgres')
const { initMailer } = require('./controllers/mail')

// Load .env Enviroment Variables to process.env
const { PORT} = process.env

// Instantiate an Express Application
const app = express()

 const server = require('http')
    .createServer(app)
    .listen(PORT)
    

connectpsql()
initMailer()

// Configure Express
app.use(express.static(__dirname + '/public'))

app.use(express.json( { limit: '50mb' } ))
app.use(express.urlencoded( { extended: true, limit: '10mb' } ))
app.use(cookieParser())

app.use(cors())
app.use(helmet())

// Assign Routes
app.use('/server', require('./routes/serverRouter'))
app.use('/', require('./routes/router'))

//schedule cron updates to forecast
cron.schedule("* 9,22 * * *", imsAPI_15cities)
cron.schedule("59 9 * * 1", cleanDatabase)