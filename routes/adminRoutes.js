const express = require('express');
const router = express.Router();
const adminModel = require('../models/admin-model');
const avatarUrl = require('../utils/avatar');
const productsModel = require('../models/product-model');


router.get('/', async (req, res) => {
    try {
        const products = await productsModel.find();
        res.render('admin', { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        try {
            const { fullname, email, password, phone } = req.body;

            if (!fullname || !email || !password || !phone) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const admins = await adminModel.find();
            if (admins.length > 0) {
                return res.status(400).json({ error: 'Admin already exists' });
            }

            let admin = await adminModel.create({
                fullname,
                email,
                password,
                phone,
                picture: avatarUrl(fullname),
            });

            res.status(201).send(admin);


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}

router.get('/owners', (req, res) => {
    res.render('createproducts');
});

// This route is for testing purposes only
router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const admin = await adminModel.findByIdAndDelete(id);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
