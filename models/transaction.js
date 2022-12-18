const mongoose = require("mongoose")
const ProductModel = require("./product")

const TransactionSchema = new mongoose.Schema({
    userId: [{type: String, index: true}],
    userName: String,
    userSurname: String,
    address: String,
    contactEmail: String,
    contactPhone: String,
    typeOfPayment:String,
    typeOfDelivery: String,
    products: [{
        productId: String,
        productName: String,
        price: Number
    }],
    overallPrice: Number,
    dateReceived: {type: String, index: true},
    additionalData: String
})

const TransactionModel = new mongoose.model("TransactionModel", TransactionSchema)

module.exports = TransactionModel