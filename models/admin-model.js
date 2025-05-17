const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    fullanme: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    products: {
        type: Array,
        default: [],
    },
    picture: {
        type: String,
        default: '',
    },
    gstin: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]{3}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid GSTIN!`,
        },
    },
});

module.exports = mongoose.model('admin', adminSchema);
