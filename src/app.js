const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan')
const fs = require('fs')
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))

const brandRouter = require('./routes/brand.routes')
const productRouter = require('./routes/product.routes')
const retailerRouter = require('./routes/retailer.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/brand", brandRouter)
app.use("/product", productRouter)
app.use("/retailer", retailerRouter)


app.use(function (req, res, next) {
  res.status(200).send("Application is up and running, Refer the <a href='https://www.getpostman.com/collections/8a463250b9edf2faca98'>postman collection.</a>")
});

module.exports = app;
