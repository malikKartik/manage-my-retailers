const { verifyToken } = require("../services/auth.service")

exports.isRetailer = (req, res, next) =>{
    const decoded = verifyToken(req, res)
    console.log(decoded)
    if(!decoded || !decoded.isRetailer) return res.status(403).send('Unauthorized');
    if(decoded.id){
        req.retailerId = decoded.id
        next()
    } else {
        return res.status(403).send('Unauthorized');
    }
}