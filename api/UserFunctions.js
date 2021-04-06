const User = require('./User.model');

function RegisterNewUserController(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        console.error(`Invalid username or password: |${email}| -- |${password}|`);
        res.status(400).json('Username and password are required').send();
        return;
    }

    //TODO: check input values


    //TODO: insert a user in db
    new User( {email: email, passwordHash: "notarealpasswordhash:)"} ).save(
        (err, newUser) => {
            if (err) {
                console.error('user not inserted, some error occurred');
                res.status(401).json('User already present!').send();
                return;
            }
                
            console.log(`${newUser.email} inserted successfully!`);
            res.status(200).send();
        }
    );
}

exports.RegisterNewUser = RegisterNewUserController;