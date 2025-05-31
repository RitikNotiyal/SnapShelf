const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const accessToken = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    );

    const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );

    return { accessToken, refreshToken };
}

module.exports = generateToken;