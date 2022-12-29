const express = require("express")
const databaseManager = require("../db/database-manager")
const validateToken = require("../middleware/validate-token")
const validateTransaction = require("../middleware/validate-transaction")
const TransactionModel = require("../models/transaction")
const generateCurrentDateTimeString = require("../utils/generate-current-datetime")

const transactionRouter = express.Router()
const emailService = require("../utils/email-service")
const EthereumTransationManager = require("../utils/ethereum-transaction-manager")

transactionRouter.post("/buy", validateToken, validateTransaction, (req, res)=>{
    let currentDateTime = generateCurrentDateTimeString()

    console.log(currentDateTime)
    
    let transaction = {
        userId: req.body.userId,
        userName: dataEnryption.encrypt(req.body.userName),
        userSurname: dataEnryption.encrypt(req.body.userSurname),
        address: dataEnryption.encrypt(req.body.address),
        contactEmail: dataEnryption.encrypt(req.body.contactEmail),
        contactPhone: dataEnryption.encrypt(req.body.contactPhone),
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

        data = {
            ...data,
            userName: dataEnryption.decrypt(userName),
            userSurname: dataEnryption.decrypt(userSurname),
             address: dataEnryption.decrypt(address),
             contactEmail: dataEnryption.decrypt(contactEmail),
             contactPhone: dataEnryption.decrypt(contactPhone)
        }
        
        res.json(data).status(200).end()
    })
    .catch(()=>{
        res.status(500).end()
    })
})

transactionRouter.get("/checkEthTransaction", (req, res) => {
    let clientAddress = req.query.address
    if(!clientAddress){
        res.status(400).end()
        return
    }

    const manager = new EthereumTransationManager()
    manager.init("", "")

    let txCounter = 0
    manager.checkForTransation(clientAddress, (isValid)=>{
        if(isValid){
            res.status(200).end()
            return
        }
        else {
            if(txCounter===20) {
                res.status(405).end()
                manager.cancel()
                return
            }
            txCounter++
        }
    })
})

module.exports = transactionRouter