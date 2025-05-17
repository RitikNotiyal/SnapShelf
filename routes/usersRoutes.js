const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User Home');
});


module.exports = router;