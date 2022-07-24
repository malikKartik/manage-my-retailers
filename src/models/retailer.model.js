const mongoose = require('mongoose');
const { RETAILER_SCHEMA, BRAND_SCHEMA, RETAILER_PRODUCT_SCHEMA } = require('../constants/schemas');

const retailerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
  brands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: BRAND_SCHEMA,
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: RETAILER_PRODUCT_SCHEMA
  }]
});

module.exports = mongoose.model(RETAILER_SCHEMA, retailerSchema);
