const express = require('express');
const router = express.Router();
const { registerController, loginController, logoutController, refreshTokenController } = require('../controllers/userController');

router.get('/', (req, res) => {
res.send('User Home');
});

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.get('/refresh-token', refreshTokenController);




module.exports = router;