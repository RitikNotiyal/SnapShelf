const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    fullname: {
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
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(v);
            },
            message: (props) => 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
        },
    },
    phone: {
        type: String,
        required: false, // Optional field
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
    order: {
        type: Array,
        default: [],
    },
    picture: {
        type: String,
        default: '',
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('user', userSchema);
