const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require('cors')

app.use(cors())
app.options('*', cors())

require("dotenv/config")
const api = process.env.API_URL
const productsRouter = require('./routes/products')
const authJwt  = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

// middleware  - checks everything going to the server before getting executed
app.use(bodyParser.json())
app.use(morgan("tiny"))
app.use(authJwt())

// to handle authorization errors
app.use(errorHandler)

const Product = require('./models/product')


// Routes
const categoriesRoutes = require('./routes/categories')
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')
const variationsRoutes = require('./routes/variations')

// const authJwt = require("./helpers/jwt")

app.use(`${api}/categories`, categoriesRoutes) 
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)
app.use(`${api}/variations`, variationsRoutes)

// app.post(`${api}/products`, (req, res) =>{
//     const newProduct = req.body
//     console.log(newProduct)
//     res.send(newProduct)
// })

// Connecting the database before starting the server
mongoose.connect(process.env.CONNECTION_STRING)
.then(() =>{
    console.log("Database connection is ready...")
}) 
.catch((err) =>{
    console.log(err)
})


app.listen(3000, () =>{
    // console.log(api)
    console.log("Server is running on http://localhost:3000")
})