const bcrypt = require('bcryptjs');
const Auth = require('../Models/Auth');


class AuthController {
    homepage(req, res) {
        res.send('homepage');
    }
    
    //POST api/auth/register
    async register(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const auth = new Auth({
                id: req.body.id,
                name: req.body.name,
                password: hashPassword,
            });
            const newAuth = await auth.save();
            res.json(newAuth);
        }
        catch(err) {
            res.json(err);
        }
    }

    // POST api/auth/login
    async login(req, res, next) {
        try {
            const auth = await Auth.findOne({id : req.body.id});
            if (!auth) {
                const err = new Error('Invalid')
                return res.json({message: err.message});
            }
            const checkPassword = await bcrypt.compare(req.body.password, auth.password);
            if (!checkPassword) {
                const err = new Error('Invalid password')
                return res.json({message: err.message});
            }

            res.json(auth)
        }
        catch(err) {
            res.json(err);
        }
        
    }

    // DELETE api/auth/logout
    logout(req, res) {

    }

    
}

module.exports = new AuthController();