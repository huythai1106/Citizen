const bcrypt = require('bcryptjs');
const Auth = require('../Models/Auth');
const jwt = require('jsonwebtoken');


class AuthController {
    homepage(req, res) {
        const query = req.query;
        if (!query) {
            res.json({
                q: '123',
            });
        }
        else {
            res.json(query)
        }
       
    }

    //POST api/auth/registerAdmin
    async registerAdmin(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

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
        }
        catch(err) {
            // err
        }
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
            // res.json(err);
            next(err);
        }
    }

    // POST api/auth/login
    async login(req, res, next) {
        try {
            const auth = await Auth.findOne({id : req.body.id});
            if (!auth) {
                const err = new Error('Invalid id');
                err.statusCode = 400;
                return next(err);
            }
            const checkPassword = await bcrypt.compare(req.body.password, auth.password);
            if (!checkPassword) {
                const err = new Error('Invalid password')
                err.statusCode = 400;
                return next(err);
            }
            const token = jwt.sign( {authId: auth.id, role: auth.role, state: auth.state, deadTime: auth.deadTime}, process.env.TOKEN_SECRET)

            res.status(200).json({
                status: 'success',
                data: {
                    token: token,
                    id: auth.id,
                    name: auth.name,
                    role: auth.role,
                    state: auth.state,
                    deadTime: auth.deadTime,
                }
            })
        }
        catch(err) {
            // 
            res.json(err);
        }
        
    }

    // DELETE api/auth/logout
    async logout(req, res, next) {
       
    }

    // DELETE api/auth/:subId/deleteAccount
    async destroy(req, res, next) {
        const subId = req.params.subId;
        if (req.authId === '00' || subId.startsWith(req.authId)) {
            try {
                await Auth.deleteMany({
                    id : {
                        $regex: `^${subId}`,
                    },
                });
                res.status(200).json({message: 'sussess'});
            }
            catch (err) {
                next(err);
            }
        }
        else {
            const err = new Error('You dont have permission');
            err.statusCode = 403;
            next(err);
        }
    }

    // GET api/auth/:id/getAllAccount
    getAccount(req, res, next) {
        const idFiled = req.params.id;
        if (idFiled.startsWith(req.authId)) {
            Auth.find({
                id: {
                    $regex: `^${idFiled}[0-9][0-9]$`, // id g???c 01 -> 01xx
                }
            })
            .then( data => {
                res.status(200).json({
                    status: 200,
                    data: data,
                });
            })
            .catch(err => next(err)); 
        }
        else {
            const err = new Error('You dont have permission');
            err.statusCode = 403;
            return next(err);
            // next(err);
        }
    }

    // PATCH api/auth/changePassword
    async changePassword(req, res , next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashNewPassword = await bcrypt.hash(req.body.password, salt);

            await Auth.updateOne({id: req.authId}, {password: hashNewPassword});
            res.status(200).json({message: 'sussess'});
        }
        catch(err) {
            next(err)
        }
    }

    // PATCH api/auth/changeStatus
    async changeStatus(req, res , next) {
        try {
            if (req.body.state === false) {
                if (req.authId === "00") {
                    await Auth.updateMany({} , {state: false, dateTime: Date.now()})
                }
                else {
                    await Auth.updateMany({ id : {
                        $regex: `^${req.authId}`
                    }} , {state: false, dateTime: Date.now()})
                }
            }
            else {
                console.log(req.requestTime);
                await Auth.updateOne({ id : {
                    $regex: `^${req.authId}[0-9]`
                }}, { state: req.body.state, deadTime: req.requestTime})
            }

            res.status(200).json({
                message: "sucessfully"
            })
       }
       catch(err) {
            next(err);
       }
    }
    
}

module.exports = new AuthController();