const express = require('express');
const router = express.Router();
const iSAuthenticated = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');

router.get('/', (req, res) => {
    res.render("index", { error: "" });
});

router.get('/shop', iSAuthenticated, async function (req, res) {
    let products = await productModel.find()
    res.render("shop", { products });
})

module.exports = router;