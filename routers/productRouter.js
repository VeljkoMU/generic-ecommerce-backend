const express = require("express")
const databaseManager = require("../db/database-manager")
const validateToken = require("../middleware/validate-token")
const ProductModel = require("../models/product")

const productRouter = express.Router()

productRouter.get("/category", async (req, res)=>{
    if(!req.query.category){
        res.status(400).end()
        return
    }

    let products = await databaseManager.getProductsByCategory(req.query.category, req.query.page)

    if(!products){
        res.status(500).end()
        return
    }

    products = {
        docs: products.docs,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage
    }

    res.json(products).status(200).end()
})

productRouter.get("/tag", async (req, res)=>{
    if(!req.query.tag){
        res.status(400).end()
        return
    }
   
    let products = await databaseManager.getProductsByTag(req.query.tag, req.query.page)

    if(!products){
        res.status(500).end()
        return
    }

    products = {
        docs: products.docs,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage
    }

    res.json(products).status(200).end()
})

productRouter.get("/", async (req, res)=>{
    let products = await databaseManager.getAllProducts(req.query.page)

    if(!products){
        res.status(500).end()
        return
    }

    res.json(products).status(200).end()    
})

productRouter.post("/rate", validateToken, async(req, res) => {
    if(!req.body.rating 
        || req.body.rating >5 
        || req.body.rating <1 
        || !req.body.productId) {
            res.status(400).end()
            return
        }
    
    const result = await databaseManager.rateProduct(req.body.rating, req.body.productId)
    if(result)
        res.status(200).end()
    else
        res.status(500).end()
})


module.exports = productRouter