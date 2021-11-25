const Auth = require('../Models/Auth')

class AuthController {
    homepage(req, res) {
        res.send('homepage');
    }
    
    //POST api/auth/register
    async register(req, res, next) {
        const auth = new Auth(req.body);
        try {
            await auth.save();
            res.json(auth);
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
                const err = new Error({
                    message : 'Invalid',
                })
                return res.json({message: err.message});
            }
            if (req.body.password !== auth.password) {
                const err = new Error({
                    message : 'Invalid password',
                })
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