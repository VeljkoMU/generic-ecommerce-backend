const mongoose = require("mongoose")

let connectionString = process.env.MONGO_DB_CONNESTION_STRING || ""

let initMongoConnection = function(initCallback){
mongoose.connect(connectionString, ()=>{
    console.log("MongoDB database connected to successfuly.")
    initCallback()
})
}

module.exports = initMongoConnection