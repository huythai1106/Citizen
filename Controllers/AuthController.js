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
            res.status(200).json(newAuth);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }

    // POST api/auth/login
    async login(req, res, next) {
        try {
            const auth = await Auth.findOne({id : req.body.id});
            if (!auth) {
                const err = new Error('Invalid')
                return res.status(403).json({message: err.message});
            }
            const checkPassword = await bcrypt.compare(req.body.password, auth.password);
            if (!checkPassword) {
                const err = new Error('Invalid password')
                return res.status(403).json({message: err.message});
            }
            res.status(200).json(auth)
        }
        catch(err) {
            res.status(403).json(err);
        }
        
    }

    // DELETE api/auth/logout
    async logout(req, res, next) {
       
    }

    // DELETE api/auth/destroy
    async destroy(req, res, next) {
        try {
            await Auth.deleteOne({id : req.body.id});

            res.status(200).json({message: 'sussess'});
        }
        catch (err) {
            res.status(500).json({message: 'Falire'});
        }
    }

    // GET api/auth/:id
    getAccount(req, res, next) {
        const idFiled = req.params.id;
        Auth.find({
            id: {
                $regex: `^${idFiled}[0-9][0-9]`,
            }
        })
        .then( data => {
            res.json(data);
        })
    }
}

module.exports = new AuthController();