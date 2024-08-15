const {Variation} = require('../models/variation')
const express = require('express')
const router = express.Router()


// GET API
router.get(`/`, async (req, res) =>{
    const variationList = await Variation.find() 
    if(!variationList){
        res.status(500).json({success: false})
    }
    res.status(200).send(variationList)
})

// GET Categories list API
router.get('/:id', async(req, res) =>{
    const variation = await Variation.findById(req.params.id)

    if(!variation){
        res.status(500).json({message: 'The category with the given ID was not found'})
    }
    res.status(200).send(variation)
})

// POST API
router.post(`/`, async (req, res) =>{
    let variation = new Variation({
        name: req.body.name,
        size: req.body.size,
        color: req.body.color,
        brand: req.body.brand
    })
    variation = await variation.save()

    if(!variation)
        return res.status(404).send('the category cannot be created')
    res.send(variation)
})

//  Update API
router.put('/:id', async(req, res) =>{
    const variation = await Variation.findByIdAndUpdate(
        req.params.id,{
            name: req.body.name,
            size: req.body.size,
            color: req.body.color,
            brand: req.body.brand
        },
        { new: true }
    )
    if(!variation)
        return res.status(400).send('The category cannot be created')
    res.send(variation)
})

// Delete API
router.delete('/:id', (req, res) =>{
    Variation.findByIdAndDelete(req.params.id).then(variation =>{
        if(variation){
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