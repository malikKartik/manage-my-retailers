const {findOneAndUpdate} = require('../daos/retailerProduct.dao');

const RetailerProductService = {
    async updateProductPrice(productId, newPrice){
        return findOneAndUpdate({_id: productId}, { price: newPrice }, {new: true})
    },
    async startPromotion(productId, price, endDate){
        return findOneAndUpdate({_id: productId}, {price: price, priceLastDate: endDate}, {new: true})
    }
}

module.exports = RetailerProductService