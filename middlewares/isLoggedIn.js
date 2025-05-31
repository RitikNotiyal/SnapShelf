const jwt = require('jsonwebtoken');


const iSAuthenticated = (req, res, next) => { 
    const token = req.cookies.accessToken

    if (!token) { 
        return res.status(401).json({ error: 'Unauthorized access' });
    }
}