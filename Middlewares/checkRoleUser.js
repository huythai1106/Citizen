const Auth = require('../Models/Auth')

module.exports = async function(req, res, next) {
    try {

        if (req.authId === "00") {
            return next();
        }
    
        let parentId = '';
        let isCheck = true
    
        const adminAuth = await Auth.findOne({ id: "00" });
        if (adminAuth.state === false) {
            return res.status(403).json({message: 'You are not allowed to access this by admin'})
        }
    
        for (var i = 0 ; i < req.role - 1; i++) {   
            parentId += req.authId[2*i] + req.authId[2*i+1];
            console.log(parentId);
            const parent = await Auth.findOne({ id: parentId });
            if (parent.state === false) {
                isCheck = false;
                break;
            }
        }
    
        if (isCheck === false) {
            return res.status(403).json({message: 'You are not allowed to access this'})
        }
        else {
            return next();
        }
    }
    catch(err) {
        return res.json({message: err.message})
    }
}