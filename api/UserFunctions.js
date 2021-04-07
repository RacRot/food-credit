const User = require('./User.model');
const bcrypt = require('bcrypt');

async function RegisterNewUserController(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    if (!email || !password || !username) {
        console.error(`Invalid email or password or username: |${email}| -- |${password}| -- |${username}|`);
        res.status(400).json('Username, password and username are required').send();
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
                    errorMsg = 'Email already present!';
                else if (msg.includes('username'))
                    errorMsg = 'Username already present!';
                else
                    errorMsg = 'Other error!';
                
                res.status(401).json(errorMsg).send();
            } else {
                

                console.log(`${newUser.username} inserted successfully!`);
                res.status(200).send();
            }
        }
    );
}

exports.RegisterNewUser = RegisterNewUserController;