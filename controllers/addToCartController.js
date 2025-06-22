const userModel = require('../models/user-model');

exports.addtocart = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        
        const productId = req.params.id;

        // Check if the product is already in the cart
        const existingProduct = user.cart.find(item => item.productId.equals(productId));
        
        if (existingProduct) {
            exisitingProduct.quantity += 1;
        } else { 
            user.cart.push({ productId, quantity: 1 });
        }
        await user.save();
        res.redirect('/shop');
    } catch (error) {
        res.status(500).send('Server Error', error);
    }
}