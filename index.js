let express = require("express")
let port = "3000"
let databaseManager = require("./db/database-manager")
let userRouter = require("./routers/userRouter")
let path = require("path")
const productRouter = require("./routers/productRouter")
const transactionRouter = require("./routers/transactionRouter")

let app = express()

databaseManager.initDatabase()

app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/transactions", transactionRouter)

app.use("/site", express.static(path.join(__dirname, "public")))

app.listen(port, ()=>{
    console.log("Express listening at port: " + port)
})