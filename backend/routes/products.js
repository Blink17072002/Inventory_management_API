const express = require('express')
const router = express.Router()
const {Product} = require('../models/product')
const {Category} = require('../models/category')
const mongoose = require('mongoose')



// GET request API for all products
router.get(`/`, async (req, res) =>{  // use of async and await to prevent an error from occuring
    let filter = {}
    if(req.query.categories){
        categoriesArray = req.query.categories.split(',')
        filter = { category: { $in: categoriesArray } }  // Sets the filter object to look for documents where the category field's value is one of the values in the categoriesArray.
    }
    const productList = await Product.find(filter).populate('category') // To get all products from database i.e mongodb

    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList)
})


// GET request API for one product
router.get(`/:id`, async (req, res) =>{  
    const product = await Product.findById(req.params.id).populate('category')  // To get the details of the category - populate

    if(!product){
        res.status(500).json({message: "The product with the given ID was not found."})
    }
    res.status(200).send(product)
})


// POST request API
router.post(`/`, async (req, res) =>{
    const category = await Category.findById(req.body.category)  // To validate the category
    if(!category) return res.status(400).send('Invalid Category')

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    product = await product.save()

    if(!product)
        return res.status(500).send('The product cannot be created')
    res.send(product)

    // product.save().then((createdProduct =>{
    //     res.status(201).json(createdProduct)
    // }))
    // .catch((err) =>{
    //     res.status(500).json({
    //         error: err,
    //         success: false
    //     })
    // })
})

// Update Product REST API
router.put('/:id', async(req, res) =>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid Product')
    }
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,{
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        { new: true }
    )
    if(!product)
        return res.status(500).send('The category cannot be updated')
    res.send(product)
})


// Delete API
router.delete('/:id', (req, res) =>{
    Product.findByIdAndDelete(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success: true, message: 'The product has been deleted'})
        }
        else{
            return res.status(404).json({success: false, message: 'Product not found'})
        }
    }).catch(err =>{ // To catch errors
        return res.status(400).json({success: false, error: err})
    })

})

// GET Products count API
router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments()

    if(!productCount){
        res.status(500).json({success: false})
    }
    res.send({
        productCount: productCount
    })
})


// GET request API for featured products with specific number to be featured by user
router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count: 0  // If the user requests something, then get it. If not, return zero
    const products = await Product.find({isFeatured: true}).limit(+count)  // + sign is to change count which is a string to a number

    if(!products){
        res.status(500).json({success: false})
    }
    res.send(products)
})


module.exports = router