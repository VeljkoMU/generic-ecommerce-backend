const express = require("express")
const md5 = require("md5")

const userRouter = express.Router()
const databaseManager = require("../db/database-manager")
const validateUser = require("../middleware/validate-user")
const tokenManager = require("../utils/token-manager")
const dataEnryption = require("../utils/data-encryption")

userRouter.post("/", validateUser, (req, res) =>{
    const user = {
        name: dataEnryption.encrypt(req.body.name),
            surname: dataEnryption.encrypt(req.body.surname),
            address: dataEnryption.encrypt(req.body.address),
            password: md5(req.body.password),
            phone: dataEnryption.encrypt(req.body.phone),
            email: dataEnryption.encrypt(req.body.email)
    }
    databaseManager.insertUser(user)
    .then(()=>{
        res.status(200).end()
    })
    .catch((err)=>{
        res.status(500).end()
    })
})

userRouter.post("/login", async (req, res)=>{
    let user = await databaseManager.getUserByEmail(dataEnryption.encrypt(req.body.email))
    if(user === undefined){
        res.status(404).end()
        return
    }

    if(md5(req.body.password) === user.password){
        let token = await tokenManager.generateToken()
        if(!token){
            res.status(500).end()
            return
        }

        res.json({
            token: token
        }).status(200).end()
    }
    else{
        res.status(403).end()
    }
})

userRouter.delete("/", (req, res)=>{
    databaseManager.deleteUser(req.body.userId)
    .then(()=>{
        res.status(200).end()
    })
    .catch(()=>{
        res.status(500).end()
    })
})

module.exports = userRouter