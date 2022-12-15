const mongoose = require("mongoose")
const ProductModel = require("./product")

const TransactionSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId: [{type: Number, index: true}],
    userName: String,
    userSurname: String,
    address: String,
    contactEmail: String,
    contactPhone: String,
    typeOfPayment:String,
    typeOfDelivery: String,
    products: [{
        productId: Number,
        productName: String,
        price: Number
    }],
    overallPrice: Number,
    dateReceived: {type: String, index: true},
    additionalData: String
})

const TransactionModel = new mongoose.model("TransactionModel", TransactionSchema)

module.exports = TransactionModel