const express = require('express');
const router = express.Router();
const iSAuthenticated = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const { addtocart } = require('../controllers/addToCartController');

router.get('/', (req, res) => {
    res.render("index", { error: "", loggedIn : false });
});

router.get('/shop', iSAuthenticated, async function (req, res) {
    let products = await productModel.find()
    res.render("shop", { products });
})

router.post('/addtocart/:id', iSAuthenticated, addtocart)

router.get('/cart', iSAuthenticated, (req, res) => {
    res.render("cart");
});

module.exports = router;