const TokenModel = require("../models/token")
const tokenManager = require("../utils/token-manager")


const validateToken = async function(req, res, next){
    let token = req.body.token
    if(!token){
        res.status(400).end()
        return
    }

    tokenManager.validateToken(token, ()=>{
        next()
    },
    ()=>{
        res.status(403).end()
    })
}

module.exports = validateToken