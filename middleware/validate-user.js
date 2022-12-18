

const validateUser = function(req, res, next){
    if(!req.body.name
        || !req.body.surname
        || !req.body.address
        || !req.body.password
        || !req.body.phone
        || !req.body.email){
            res.status(400).end()
            return
        }
    
    next()
}

module.exports = validateUser