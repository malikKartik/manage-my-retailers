const mongoose = require('mongoose');
const { RETAILER_PRODUCT_SCHEMA, PRODUCT_SCHEMA } = require('../constants/schemas');

const retailerProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PRODUCT_SCHEMA
  },
  price: {type: Number, required: true},
  units: {type: Number, required: true},
  priceLastDate: {type: Date}
});

module.exports = mongoose.model(RETAILER_PRODUCT_SCHEMA, retailerProductSchema);
