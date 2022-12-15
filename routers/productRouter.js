const express = require("express")
const databaseManager = require("../db/database-manager")

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


module.exports = productRouter