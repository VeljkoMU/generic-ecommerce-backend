const databaseManager = require("../db/database-manager")


const validateTransaction = function(req, res, next){
    if(!validateUserData || !validateTransactionData || validateProducts){
        res.status(400).end()
        return
    }

    next()
}

function validateUserData(body){
    if(!body.userId 
        || !body.userName 
        || !body.userSurname 
        || !body.address)
        return false
    else
        return true
}

function validateTransactionData(body){
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
    if(!body.products || body.products.length === 0)
        return false
    
    for(let product of body.products){
        if(!product.productId || !product.productName || !product.price)
            return false
        
        let productInDb = await databaseManager.getProductById(product.productId)
        if(!productInDb || !productInDb.isAvailable)
            return false
    }

    return true
}

module.exports = validateTransaction