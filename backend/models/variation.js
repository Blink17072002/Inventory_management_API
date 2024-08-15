const mongoose = require('mongoose')

const variationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    color: {
        type: String
    },
    brand: {
        type: String
    }
})

exports.Variation = mongoose.model('Variation', variationSchema)