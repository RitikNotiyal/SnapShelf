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

        // Constants
        const platformFee = 20;
        const shippingFee = 0;

        // Initialize with default values
        let totalMRP = 0;
        let totalDiscount = 0;
        let subtotal = 0;

        // Only calculate if cart has items
        if (userCart && userCart.cart && userCart.cart.length > 0) {
            userCart.cart.forEach(item => {
                const p = item.productId;
                const qty = item.quantity || 1; // Default quantity to 1

                // Ensure prices are numbers
                const price = parseFloat(p.price) || 0;
                const discountedPrice = parseFloat(p.discountedPrice) || 0;

                totalMRP += price * qty;
                subtotal += discountedPrice * qty;
                totalDiscount += (price - discountedPrice) * qty;
            });
        }

        const totalAmount = subtotal + platformFee + shippingFee;

        res.render("cart", {
            userCart,
            totalMRP: totalMRP.toFixed(2),
            totalDiscount: totalDiscount.toFixed(2),
            platformFee,
            shippingFee,
            subtotal: subtotal.toFixed(2),
            totalAmount: totalAmount.toFixed(2)
        });

    } catch (err) {
        console.error("Error loading cart:", err);
        res.status(500).render("cart", {
            userCart: null,
            totalMRP: "0.00",
            totalDiscount: "0.00",
            platformFee: 20,
            shippingFee: 0,
            subtotal: "0.00",
            totalAmount: "20.00",
            error: "Something went wrong"
        });
    }
});


module.exports = router;