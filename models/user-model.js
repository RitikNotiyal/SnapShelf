const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Array,
        default: [],
    },
    picture: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('user', userSchema);
