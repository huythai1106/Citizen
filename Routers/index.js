const Auth = require('./Auth')

function Route(app) {
    app.use('/api/auth', Auth)
}

module.exports = Route;