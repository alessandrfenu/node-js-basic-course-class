const jwt = require('jsonwebtoken');
 
module.exports = async(req, res) =>  {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: 'No token, authorization denied' });
    }
    token = token.replace('Bearer ', '');
 
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(403).send({ message: 'Token is not valid' });
    }
}