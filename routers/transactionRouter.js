const express = require("express")
const databaseManager = require("../db/database-manager")
const validateToken = require("../middleware/validate-token")
const validateTransaction = require("../middleware/validate-transaction")
const TransactionModel = require("../models/transaction")
const generateCurrentDateTimeString = require("../utils/generate-current-datetime")

const transactionRouter = express.Router()

transactionRouter.post("/buy", validateToken, validateTransaction, (req, res)=>{
    let currentDateTime = generateCurrentDateTimeString()
    
    let transaction = {
        userId: req.userId,
        userName: req.userName,
        userSurname: req.userSurname,
        address: req.address,
        contactEmail: req.email,
        contactPhone: req.phone,
        typeOfPayment: req.payment,
        typeOfDelivery: req.delivery,
        products: req.products,
        overallPrice: price,
        dateReceived: currentDateTime,
        additionalData: req.data
    }

    databaseManager.insertTransaction(transaction)
    .then(()=>{
        res.status(200).end()
    })
    .catch(()=>{
        res.status(500).end()
    })
})

transactionRouter.get("/all", (req, res)=>{
    databaseManager.getAllTransactions()
    .then((data)=>{
        if(!data)
            res.status(500).end()
        res.json(data).status(200).end()
    })
    .catch(()=>{
        res.status(500).end()
    })
})

module.exports = transactionRouter