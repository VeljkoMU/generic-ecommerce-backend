const databaseManager = require("../db/database-manager")


const validateTransaction = function(req, res, next){
    console.log(1)
    if(!validateUserData(req.body) || !validateTransactionData(req.body) || !validateProducts){
        res.status(400).end()
        return
    }

    next()
}

function validateUserData(body){
    console.log(1)
    if(!body.userId 
        || !body.userName 
        || !body.userSurname 
        || !body.address)
        return false
    else
        return true
}

function validateTransactionData(body){
    console.log(2)
    if(!body.contactEmail
        || !body.contactPhone
        || !body.typeOfPayment
        || !body.typeOfDelivery
        || !body.overallPrice
        || !body.additionalData)
            return false
    else
        return true
}

async function validateProducts(body){
    console.log(3)
    if(!body.products || body.products.length === 0)
        return false
    
    for(let product of body.products){
        if(!product.productId || !product.productName || !product.price)
            return false
        
        let productInDb = await databaseManager.getProductById(product.productId)
        console.log(productInDb)
        if(!productInDb || !productInDb.isAvailable)
            return false
    }

    return true
}

module.exports = validateTransaction