const {Order} = require('../models/order')
const express = require('express')
const {User} = require('../models/user')
const {OrderItems} = require('../models/order-item')
const router = express.Router()


// Get orders
router.get(`/`, async (req, res) =>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1})  // sort from newest to oldest
    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList)
})

// Get specific order by id
router.get(`/:id`, async (req, res) =>{
    try{
        const order = await Order.findById(req.params.id).populate('user', 'name').populate({
        path: 'orderItems', populate: {path: 'product', populate: 'category'}
        })  // to show details of order-items, user and product

        if(!order){
            res.status(500).json({success: false})
        }
        res.send(order)
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
})

router.post(`/`, async (req, res) =>{
    const orderItemsIds = await Promise.all(req.body.orderItems.map(async orderItem =>{ // promise.all() - to prevent orderItems from bringing an empty array
        let newOrderItem = new OrderItems({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save()

        return newOrderItem._id
    }))  // Loop to get order-items ids: product id, 

    // to get the total price of items ordered from the database instead of the frontend
    const totalPrices = await Promise.all(orderItemsIds.map(async orderItemId =>{
        const orderItem = await OrderItems.findById(orderItemId).populate('product', 'price')
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice
    }))
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0); // sum all total prices

    let order = new Order({
        orderItems: orderItemsIds,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
        dateOrdered: req.body.dateOrdered,
    })

   order = await order.save()

    if(!order){
        res.status(500).json.send('Order could not be created')
    }
    res.send(order)
})

// Update order from pending, to processed, shipped, delivered
router.put(`/:id`, async(req, res) =>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
    {
        status: req.body.status  // update status of order
    })
    if(!order){
        res.status(500).send('Order cannot be updated')
    }
    res.send('Order updated successfully.')
    return(order)
})

// Delete order API
router.delete(`/:id`, async(req, res) =>{
    const order = await Order.findByIdAndDelete(req.params.id)
    if(!order){
        res.status(500).json({success: false, message: "Unsuccessful deletion, try again"})
    }
    else{
        order.orderItems.map(async orderItem => {
            await OrderItems.findByIdAndDelete(orderItem)
        })
        res.status(200).json({success: true, message: 'Order deleted successfully'})
    }
})

module.exports = router