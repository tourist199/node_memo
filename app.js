const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRouters = require('./api/routers/user')
const categoryRouters = require('./api/routers/category')
const noteRouters = require('./api/routers/note')

mongoose.connect('mongodb+srv://khanhadmin:'+process.env.MONGO_ATLAS_PW+'@db-memo-vkzsl.mongodb.net/test?retryWrites=true&w=majority')
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authoriuzation')
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/users', userRouters)
app.use('/categories', categoryRouters)
app.use('/notes', noteRouters)

app.use((req, res, next)=>{
    const err = new Error('Not found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next)=>{
    res.status( err.status || 500)
    res.json ({
        err: {
            ms : err.message
        }
    })
})

module.exports = app;