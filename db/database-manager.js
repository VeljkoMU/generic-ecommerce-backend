const ProductModel = require("../models/product")
const TransactionModel = require("../models/transaction")
const UserModel = require("../models/user")

class DatabaseManager {
    constructor(){
        this.databaseInitilized = false
        this.mongoInitilizer = require("./mongo-db")
    }

    initDatabase(){
        this.mongoInitilizer(()=>{
            this.databaseInitilized = true
        })
    }

    async getUserByEmail(email){
        let user = await UserModel.findOne({email: email})

        if(!user)
            return undefined
        
        return user
    }

    async getUserById(userId){
        return UserModel.findById(userId)
    }

    async insertUser(user){
      return   UserModel.create({
            name: user.name,
            surname: user.surname,
            address: user.address,
            password: user.password,
            phone: user.phone,
            email: user.email
        })
    }

    async deleteUser(userId){
        return UserModel.findByIdAndDelete(userId)
    }

    async insertProduct(product){
        return ProductModel.create({
            name: product.name,
            description: product.description,
            price: product.price,
            isAvailable: product.isAvailable,
            photos: product.photos,
            rating: 0,
            categories: product.categories,
            tags: product.tags
        })
    }

    async getAllProducts(pageNum){
        const skipParam = (pageNum - 1) * 10
        return await ProductModel.find({}, {skip: skipParam, limit: 10})
    }

    async getProductById(productId){
        return ProductModel.findById(productId)
    }

    async getProductsByCategory(category, pageNum){
        const skipParam = (pageNum - 1) * 10
        return await ProductModel.find({categories: category}, {skip: skipParam, limit: 10})
    }

    async getProductsByTag(tag, pageNum){
        const skipParam = (pageNum - 1) * 10
        return await ProductModel.find({tags: category}, {tag: skipParam, limit: 10})

    }

    async deleteProductById(productId){
        return ProductModel.findByIdAndDelete({_id: productId})
    }

    async insertTransaction(transaction){
        return TransactionModel.create({
            userId: transaction.userId,
            username: transaction.userName,
            userSurname: transaction.userSurname,
            address: transaction.address,
            contactEmail: transaction.contactEmail,
            contactPhone: transaction.contactPhone,
            typeOfPayment: transaction.typeOfPayment,
            typeOfDelivery: transaction.typeOfDelivery,
            products: transaction.products,
            overallPrice: transaction.overallPrice,
            dateRecieved: transaction.dateRecieved,
            additionalData: transaction.additionalData
        })
    }

    async getAllTransactions(){
        return TransactionModel.find({})
    }
}

const databaseManager = new DatabaseManager()

module.exports = databaseManager