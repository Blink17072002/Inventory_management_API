const {Category} = require('../models/category')
const express = require('express')
const router = express.Router()


// GET API
router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find() 
    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList)
})

// GET Categories list API
router.get('/:id', async(req, res) =>{
    const category = await Category.findById(req.params.id)

    if(!category){
        res.status(500).json({message: 'The category with the given ID was not found'})
    }
    res.status(200).send(category)
})

// POST API
router.post(`/`, async (req, res) =>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save()

    if(!category)
        return res.status(404).send('the category cannot be created')
    res.send(category)
})

//  Update API
router.put('/:id', async(req, res) =>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,{
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        { new: true }
    )
    if(!category)
        return res.status(400).send('The category cannot be created')
    res.send(category)
})

// Delete API
router.delete('/:id', (req, res) =>{
    Category.findByIdAndDelete(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success: true, message: 'The category has been deleted'})
        }
        else{
            return res.status(404).json({success: false, message: 'Category not found'})
        }
    }).catch(err =>{ // To catch errors
        return res.status(400).json({success: false, error: err})
    })

})

module.exports = router