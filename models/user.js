let mongoose = require("mongoose")

let UserShema = mongoose.Schema({
    name: String,
    surname: String,
    address: String,
    password: String,
    phone: String,
    email: String
})

const UserModel = mongoose.model("UserMondel", UserShema)

module.exports = UserModel