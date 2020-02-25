const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {type: mongoose.Schema.Types.ObjectId, ref:'category'},
    title: {type:String},
    createDate : {type : Date, defualt: new Date()},
    content : String,
    userId : {type: String, required : true},
    clip : {type : Boolean, defualt: false}
})

module.exports = mongoose.model('Note', orderSchema)