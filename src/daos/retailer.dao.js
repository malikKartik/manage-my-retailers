const mongoose = require('mongoose');
const RetailerModal = require('../models/retailer.model');

exports.save = async (retailer) =>{
    const retailerData = new RetailerModal({
        ...retailer,
        brands: [],
        products: [],
        _id: retailer._id || mongoose.Types.ObjectId(),
    })
    return retailerData.save();
}

exports.get = async (condition = {}) => {
    return RetailerModal.find(condition)
}

exports.findOneAndUpdate = async (condition, update, options) =>{
    return RetailerModal.findOneAndUpdate(condition, update, options)
}