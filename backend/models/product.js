const mongoose = require("mongoose")


// Model or schema for products
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    variations: {
        type: String,
        default: ''
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    price: {
        type: Number,
        default: 0,
        validator: function(value){
            value >= 0
        },
        message: 'Price must be greater than zero'
    },
    numReviews: {
        type: Number,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: false
    },
    isVisible: {
        type: Boolean,
        default: true
    },
})

// to change _id to id i.e removing the underscore from it to make it more frontend friendly
productSchema.virtual('id').get(function(){
    return this._id.toHexString() // this - a virtual field
})

productSchema.set('toJSON', {
    virtuals: true  // to enable virtual fields
})

exports.Product = mongoose.model('Product', productSchema)
