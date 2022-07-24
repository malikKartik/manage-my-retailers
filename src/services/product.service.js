const {save, get, findOneAndUpdate, getPopulated} = require('../daos/product.dao');
const {findOneAndUpdate: findOneAndUpdateRetailer} = require('../daos/retailer.dao');
const {findOneAndUpdate: findOneAndUpdateBrand} = require('../daos/brand.dao');
const {save: createRetailerProduct} = require('../daos/retailerProduct.dao')


const ProductService = {
    async getProducts(condition) {
        return get(condition)
    },
    async addRetailer({productId, retailerId, brandId, initialPrice, initialStock}){
        const retailerProduct = await createRetailerProduct({price: initialPrice, units: initialStock, product: productId})
        await findOneAndUpdate({_id: productId}, { $addToSet: {retailers: retailerId}}, {new: true})
        await findOneAndUpdateRetailer({_id: retailerId}, { $addToSet: {brands: brandId}}, {new: true})
        await findOneAndUpdateRetailer({_id: retailerId}, { $addToSet: {products: retailerProduct._id}}, {new: true})
        await findOneAndUpdateBrand({_id: brandId}, { $addToSet: {retailers: retailerId}}, {new: true})
        return "Success"
    },
    async createProduct(product) {
        return save(product)
    },
    async getAllRetailers(productId){
        return getPopulated({_id: productId})
    }
}

module.exports = ProductService