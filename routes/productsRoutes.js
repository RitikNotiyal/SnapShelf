const express = require('express');
const router = express.Router();
const upload = require('../configs/multer-config');
const productsModel = require('../models/product-model');

router.post('/create', upload.single('image'), async (req, res) => {

try {
let { image, name, price, discount, bgColor, panelColor, textColor } = req.body;

let products = await productsModel.create(
    {
        image: req.file ? req.file.buffer : null,
        name,
        price,
        discount,
        bgColor,
        panelColor,
        textColor
    }
);
res.redirect('/admin/owners');
} catch (error) {
res.status(500).json({ error: error.message });
}
});

router.delete('/delete/:id', async (req, res) => { 
try {
const { id } = req.params;
const product = await productsModel.findByIdAndDelete(id);
res.status(200).json({ message: 'Product deleted successfully' });
} catch (error) {
res.status(500).json({ error: 'Failed to delete product' });
}
})

router.delete('/deleteAll', async (req, res) => { 
try {
    await productsModel.deleteMany({});
    res.status(200).json({ message: 'All products deleted successfully' });
} catch (error) {
    res.status(500).json({ error: 'Failed to delete products' });
    }
})


module.exports = router;