const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const Authorization = req.headers['authorization'];

    if (!Authorization) {
        // error
        return res.status(404).json({
            message: 'Invalid authorization'
        })
    }

    const token = Authorization && Authorization.split(' ')[1];
    const { authId, role, state } = jwt.verify(token, process.env.TOKEN_SECRET);

    req.authId  =  authId ;
    req.role    =  role ;
    req.state  =  state ;

    next();
}