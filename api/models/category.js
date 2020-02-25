const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, max: 20},
    userId: {type:String , require : true}
})

module.exports = mongoose.model('Category', categorySchema)