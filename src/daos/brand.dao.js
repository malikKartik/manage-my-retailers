const mongoose = require('mongoose');
const BrandModel = require('../models/brand.model');

exports.save = async (brand) =>{
    const brandData = new BrandModel({
        ...brand,
        _id: brand._id || mongoose.Types.ObjectId(),
    })
    return brandData.save();
}

exports.get = async (condition = {}) => {
    return BrandModel.find(condition)
}

exports.findOneAndUpdate = async (condition, update, options) =>{
    return BrandModel.findOneAndUpdate(condition, update, options)
}