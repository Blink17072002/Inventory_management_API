const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems: [{  // putting it in an array because we would be dealing with multiple order items.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItems',
        required: true
    }],
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
})


// to change _id to id i.e removing the underscore from it to make it more frontend friendly
orderSchema.virtual('id').get(function(){
    return this._id.toHexString() // this - a virtual field i.e turning underscore id to a virtual id
})

orderSchema.set('toJSON', {
    virtuals: true  // to enable virtual fields
})

exports.Order = mongoose.model('Order', orderSchema)