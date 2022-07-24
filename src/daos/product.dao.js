const mongoose = require('mongoose');
const ProductModel = require('../models/product.model');

exports.save = async (product) =>{
    const productData = new ProductModel({
        ...product,
        _id: product._id || mongoose.Types.ObjectId(),
        retailers: []
    })
    return productData.save();
}

exports.findOneAndUpdate = async (condition, update, options) =>{
    return ProductModel.findOneAndUpdate(condition, update, options)
}

exports.get = async (condition = {}) => {
    return ProductModel.find(condition)
}

exports.getPopulated = async (condition = {}) => {
    const {_id: productId} = condition;
    return ProductModel.find(condition).populate({path: "retailers", populate: {path: "products", match: {product: productId}}})
}