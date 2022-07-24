const mongoose = require('mongoose');
const RetailerProductModel = require('../models/retailerProduct.model');

exports.save = async (retailerProduct) =>{
    const retailerProductData = new RetailerProductModel({
        ...retailerProduct,
        _id: retailerProduct._id || mongoose.Types.ObjectId(),
    })
    return retailerProductData.save();
}

exports.get = async (condition = {}) => {
    return RetailerProductModel.find(condition)
}

exports.findOneAndUpdate = async (condition, update, options) =>{
    return RetailerProductModel.findOneAndUpdate(condition, update, options)
}