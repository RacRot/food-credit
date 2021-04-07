const User = require('./User.model');
const bcrypt = require('bcrypt');

async function LoginController(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    //at least one between username and email
    if ((!username && !email) || !password) {
        console.error(`Invalid email or password or username: |${email}| -- |${password}| -- |${username}|`);
        res.status(400).json('Password and username or email are required').send();
        return;
    }

    //TODO: check input values

    //check if username/email are valid
    let user;
    if (username)
        user = await User.findOne( {username: username} );
    else if (email)
        user = await User.findOne( {email: email} );

    if (user) {
        //check if password is correct
        bcrypt.compare(
            password,
            user.passwordHash,
            (_, pswIsValid) => {
                if (!pswIsValid) {
                    console.error(`User |${user.username}|: Password hashes do not match`);
                    res.status(401).json('Username or password are not valid').send();
                } else {
                    console.log('User succesfully logged in');
                    res.status(200).send();
                }
            }
        );
    } else {
        console.error(`User not found -- |${username ? username : email}|`);
        res.status(401).json('Username or password are not valid').send();
    }
}

async function RegisterNewUserController(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    if (!email || !password || !username) {
        console.error(`Invalid email or password or username: |${email}| -- |${password}| -- |${username}|`);
        res.status(400).json('Email, password and username are required').send();
        return;
    }

    //TODO: check input values
    
    //generate hash for password
    const salt = await bcrypt.genSalt(10);
    const pswHash = await bcrypt.hash(password, salt);

    //generate and save user
    new User( {email: email, passwordHash: pswHash, username: username} ).save(
        (err, newUser) => {
            if (err) {
                const msg = err.message;
                console.error(`user not inserted, some error occurred: ${msg}`);
                
                let errorMsg;
                if (msg.includes('email'))
                    errorMsg = 'Email already present';
                else if (msg.includes('username'))
                    errorMsg = 'Username already present';
                else
                    errorMsg = 'Other error';
                
                res.status(401).json(errorMsg).send();
            } else {
                console.log(`${newUser.username} inserted successfully`);
                res.status(200).send();
            }
        }
    );
}

exports.Login = LoginController;
exports.RegisterNewUser = RegisterNewUserController;