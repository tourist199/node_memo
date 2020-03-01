const mongoose = require('mongoose')
const moment = require('moment')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {type: mongoose.Schema.Types.ObjectId, ref:'Category'},
    title: {type:String},
    createDate : {type : Date, defualt: moment()},
    content : String,
    userId : {type: String, required : true},
    clip : {type : Boolean, defualt: false},
    deleted : {type : Boolean, defualt: false},
})

module.exports = mongoose.model('Note', orderSchema)