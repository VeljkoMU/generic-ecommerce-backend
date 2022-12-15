const mongoose = require("mongoose")
const md5 = require("md5")
const TokenModel = require("../models/token")

class TokenManager{
    constructor(){
    }

    async generateToken(){
        let result = ""
        let charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.,;+-_=*"
        for(let i = 0; i<15; i++){
            result += charList.charAt(Math.floor(Math.random() * charList.length))
        }
        result = md5(result)
        let sameToken = await TokenModel.findOne({token: result})
        
        if(!sameToken){
            this.registerToken(result)
            return result
        }
        else {
            return undefined
        }
    }

    async registerToken(token){
        await TokenModel.create({
            token: result,
            authLevel: "user"
        })
    }

    validateToken(token, onValidated, onFail){
        TokenModel.findOne({token: token})
        .then((res)=>{
            if(res){
                onValidated()
            }
            else{
                onFail()
            }
        })
        .catch(()=>{
            onFail()
        })
    }
}

const tokenManager = new TokenManager()

module.exports = tokenManager