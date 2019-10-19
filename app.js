const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')


app.use(cors(), function (req, res, next) {
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

app.use(morgan('dev'))
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }))

// redis connector 

const sqlConnectorHelper = require('./helpers/sqlConnector')

const sqlClient = sqlConnectorHelper()

// sqlClient.on('ready', () => {
//     console.log('redis connection is done')
//     app.set('sql', sqlClient)
// })

// sqlClient.on('error', (err) => {
//     console.log(err)
//     app.set('sql', null)
// })
sqlClient.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    app.set('sql', sqlClient)
  });
// app.get('/',(req,res,next) => {
//     res.send('ok')
// })
// routes 
const routes = require('./routes/index');
app.use(routes);
app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        code: 'PAGE_NOT_FOUND',
        message: 'Request page is not Found'
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    let message = 'Something went wrong'
    if (process.env.NODE_ENV) {
        message = err.message || message
    }
    return res.status(err.statusCode || 500).json({
        success: false,
        code: 'UNKNOWN_ERROR',
        message
    })
})

module.exports = app