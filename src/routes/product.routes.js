const express = require('express');
const { getProducts, createProduct, addRetailer, getAllRetailers } = require('../services/product.service');
const BasicRequestHandler = require('../utils/BasicRequestHandler');
const router = express.Router();
const requestHandler = new BasicRequestHandler(router);

requestHandler.get("/", (_) => {
    return getProducts({});
})

requestHandler.post("/", (req) => {
    return createProduct(req.body);
})

requestHandler.post("/sign-retailer", (req) => {
    const {productId, retailerId, brandId, initialPrice, initialStock} = req.body;
    return addRetailer({productId, retailerId, brandId, initialPrice, initialStock})
})

requestHandler.get("/retailers/:productId", (req) => {
    const productId = req.params.productId
    return getAllRetailers(productId)
})

module.exports = router;