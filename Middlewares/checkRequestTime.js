const Auth = require('../Models/Auth');

module.exports = async function(req, res, next) {

    if (req.authId === '00') {
        return next();
    }

    if (req.body.state === false) {
        return next();
    }

    let isCheckTime = true;

    let parentId = '';

    if (req.authId.length === 2) {
        parentId = '00';
    }
    else {
        for (var i = 0 ; i < req.role - 1; i++) {
            parentId += req.authId[2*i] + req.authId[2*i+1];
        }
    }

    const parent = await Auth.findOne({ id: parentId})
    const requestTime = new Date(req.body.deadTime);
    if (parent.deadTime.getTime() < requestTime.getTime() || 
        requestTime.getTime() < Date.now())
        isCheckTime = false;

    if (!isCheckTime) {
        const err = new Error(`Vượt mức cho phép`);
        err.statusCode = 403;
        return next(err);
    }
    else {
        req.requestTime = requestTime;
        return next();
    }

}