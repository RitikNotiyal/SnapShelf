const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    discount: {
        type: Number,
        default: 0,
    },

    bgColor: {
        type: String,
        default: '#ffffff',
    },
    panelColor: {
        type: String,
        default: '#ffffff',
    },

    textColor: {
        type: String,
        default: '#000000',
    },

    image: {
    type: Buffer,
        required: true,
    }
}, { timestamps: true }
);

module.exports = mongoose.model('product', productSchema);
