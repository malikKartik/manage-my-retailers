const { verifyToken } = require("../services/auth.service")

exports.isBrand = (req, res, next) =>{
    const decoded = verifyToken(req, res)
    if(!decoded || decoded.isRetailer) return res.status(403).send('Unauthorized');
    if(decoded.id){
        req.brandId = decoded.id
        next()
    } else {
        return res.status(403).send('Unauthorized');
    }
}