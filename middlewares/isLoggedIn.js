const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const isAuthenticated = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        // Access token expired
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.redirect('/');
        }

        try {
            const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await userModel.findById(decodedRefresh.id);

            if (!user) {
                return res.redirect('/');
            }

            // Generate a new access token
            const newAccessToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
            );

            // Set new token
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge:   7 * 24 * 60 * 60 * 1000
            });

            req.user = { id: user._id, email: user.email };
            return next();
        } catch (refreshErr) {
            return res.redirect('/');
        }
    }
};

module.exports = isAuthenticated;


