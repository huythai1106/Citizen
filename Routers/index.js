const Auth = require('./Auth')
const Citizen = require('./Citizen')

function Route(app) {
    app.use('/api/auth', Auth);

    app.use('/api/citizen', Citizen);
}

module.exports = Route;