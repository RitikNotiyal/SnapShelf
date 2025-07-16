const express = require('express');
const router = express.Router();
const iSAuthenticated = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const { addtocart } = require('../controllers/addToCartController');
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
res.render("index", { error: "", loggedIn: false });
});

router.get('/shop', iSAuthenticated, async function (req, res) {
let products = await productModel.find()
res.render("shop", { products });
})

router.post('/addtocart/:id', iSAuthenticated, addtocart)

router.get('/cart', iSAuthenticated, async (req, res) => {
try {
    let userCart = await userModel
        .findById(req.user.id)
        .populate('cart.productId');
    
    const originalCartLength = userCart.cart.length;
    userCart.cart = userCart.cart.filter(item => item.productId);

    if (userCart.cart.length !== originalCartLength) {
        await userCart.save(); 
    }

    let totalMRP = 0;
    let totalDiscount = 0;
    let totalAmount = 0;

    userCart.cart.forEach(item => {
        const p = item.productId;
        const qty = item.quantity;

        totalMRP += p.price * qty;
        totalAmount += p.discountedPrice * qty;
        totalDiscount += (p.price - p.discountedPrice) * qty;
    });



    res.render("cart", {
        userCart,
        totalMRP,
        totalDiscount,
        platformFee: 20,
        totalAmount: totalAmount + platformFee
    });

} catch (err) {
    console.error("Error loading cart:", err);
    res.status(500).render("cart", {
        userCart: null,
        totalMRP: 0,
        discount: 0,
        platformFee: 20,
        error: "Something went wrong"
    });
}
});


module.exports = router;