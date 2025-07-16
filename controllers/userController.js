const { registerSchema, loginSchema } = require('../utils/validation_schema');
const userModel = require('../models/user-model');
const avatarUrl = require('../utils/avatar');
const generateToken = require('../utils/jwt');
const bcrypt = require('bcrypt'); 

const registerController = async (req, res) => {
try {
let { email, fullname, password } = await registerSchema.validateAsync(req.body);
//checing for existing user
const existingUser = await userModel.findOne({ email });
if (existingUser) {
return res.status(400).json({ error: 'User already exists' });
}

let user = await userModel.create({
email,
fullname,
password,
picture: avatarUrl(fullname)
});
// generate token
const token = generateToken(user);

//Access token Cookie
res.cookie('accessToken', token.accessToken, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
maxAge: 15 * 60 * 1000
});

//Refresh token Cookie
res.cookie('refreshToken', token.refreshToken, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
maxAge: 7 * 24 * 60 * 60 * 1000
})
    return res.redirect('/shop');
}
catch (error) {
const errorMessage = error.details?.[0]?.message || error.message || "Something went wrong";
return res.status(400).json({ error: errorMessage });
}
}

const loginController = async (req, res) => {
try {
let { email, password } = await loginSchema.validateAsync(req.body)

const user = await userModel.findOne({ email })

if (!user) {
return res.status(400).json({ error: 'Invalid email or password' });
}

const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
return res.status(400).json({ error: 'Invalid email or password' });
}

// generate token
const token = generateToken(user);
//Access token Cookie
res.cookie('accessToken', token.accessToken, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
maxAge: 15 * 60 * 1000
});

//Refresh token Cookie
res.cookie('refreshToken', token.refreshToken, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
maxAge: 7 * 24 * 60 * 60 * 1000
});
    return res.redirect('/shop');
}
catch (error) {
const errorMessage = error.details?.[0]?.message || error.message || "Something went wrong";
return res.status(400).json({ error: errorMessage });
}
}

const logoutController = (req, res) => {
res.clearCookie('accessToken');
res.clearCookie('refreshToken');
    return res.redirect('/');
}

const refreshTokenController = async (req, res) => {
const refreshToken = req.cookies.refreshToken;

if (!refreshToken) {
return res.status(401).json({ error: 'No refresh token provided' });
}
try {
const verifiedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
const user = await userModel.findById(verifiedToken.id);

// generate new tokens
const newAccessToken = jwt.sign(
{ id: user._id, email: user.email },
process.env.ACCESS_TOKEN_SECRET,
{ expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
);

res.cookie('accessToken', newAccessToken, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
maxAge: 15 * 60 * 1000
});
res.status(200).json({ message: 'Access token refreshed successfully' });
}
catch (error) {
return res.status(403).json({ error: 'Invalid refresh token' });
}
}

module.exports = {
registerController,
loginController,
logoutController,
refreshTokenController
};