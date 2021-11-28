const bcrypt = require('bcryptjs');
const Auth = require('../Models/Auth');
const jwt = require('jsonwebtoken');


class AuthController {
    homepage(req, res) {
        res.json({
            message: 'Welcome',
            name: 'homepage',
        });
    }
    
    //POST api/auth/register
    async register(req, res, next) {
        const id = req.body.id;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            if ( req.authId == '00' || id.startsWith(req.authId)) {
                const auth = new Auth({
                    id: req.body.id,
                    name: req.body.name,
                    password: hashPassword,
                    role: req.body.role, // 0 1 2 3 4
                });
                const newAuth = await auth.save();
                res.status(200).json({
                    message: req.authId,
                    data: newAuth,
                });
            } else {
                return res.status(400).json({ 
                    message: 'dont have permission',
                })
            }
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
            const token = jwt.sign( {authId: auth.id}, process.env.TOKEN_SECRET)

            res.status(200).json({
                status: 'success',
                data: {
                    token: token,
                    name: auth.name,
                }
            })
        }
        catch(err) {
            // 
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
                $regex: `^${idFiled}[0-9][0-9]`, // id gốc 01 -> 01xx
            }
        })
        .then( data => {
            res.json(data);
        })
    }

    // PATCH api/auth/:id/changePassword
    changePassword(req, res , next) {

    }

    // PATCH api/auth//:id/changeAllStatus
    changeStatus(req, res , next) {

    }

    // PATCH api/auth/:id/changeStatus/:subId
    changeAllStatus(req, res , next) {

    }
}

module.exports = new AuthController();