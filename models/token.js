
const mongoose = require("mongoose")

const TokenSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    token: {type: String, index: true},
    authLevel: String,
    expireAt: {
        type: Date,
        default: Date.now(),
        expire: 60*60*2
    }
})

TokenSchema.index()

    
const TokenModel = new mongoose.model("TokenModel", TokenSchema)
module.exports = TokenModel