const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    price: String,
    isAvailable: Boolean,
    photos: [String],
    rating: Number,
    categories: [{type: String, index: true}],
    tags: [{type: String, index: true}]
})

const ProductModel = new mongoose.model("ProductModel", ProductSchema)

module.exports = ProductModel