const User = require('./User.model');

function RegisterNewUserController(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        console.error(`invalid username or password: |${email}| -- |${password}|`);
        res.send( {code: 400} );
        return;
    }

    //TODO: insert a user in db
    res.send( {code: 200} );
}

exports.RegisterNewUser = RegisterNewUserController;