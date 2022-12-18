const express = require("express")
const databaseManager = require("../db/database-manager")
const validateToken = require("../middleware/validate-token")
const validateTransaction = require("../middleware/validate-transaction")
const TransactionModel = require("../models/transaction")
const generateCurrentDateTimeString = require("../utils/generate-current-datetime")

const transactionRouter = express.Router()
const emailService = require("../utils/email-service")

transactionRouter.post("/buy", validateToken, validateTransaction, (req, res)=>{
    let currentDateTime = generateCurrentDateTimeString()

    console.log(currentDateTime)
    
    let transaction = {
        userId: req.body.userId,
        userName: req.body.userName,
        userSurname: req.body.userSurname,
        address: req.body.address,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        typeOfPayment: req.body.typeOfPayment,
        typeOfDelivery: req.body.typeOfDelivery,
        products: req.body.products,
        overallPrice: req.body.overallPrice,
        dateReceived: currentDateTime,
        additionalData: req.body.additionalData
    }

    databaseManager.insertTransaction(transaction)
    .then(()=>{
        emailService.send("", "TEST", "Test" + req.body.contactPhone)
        res.status(200).end()
    })
    .catch((err)=>{
        console.log(err)
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