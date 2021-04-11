import User from './User.model';
import bcrypt from 'bcrypt';

function checkEmail(email) {
    if (!email || email === '')
        return 'Email empty or null';

    //RFC 5322 Official Standard
    const emailRX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (!emailRX.test(email))
        return 'Email format not valid';
    
    //no error detected
    return '';
}

function checkPassword(psw) {
    if (!psw || psw === '')
        return 'Password empty or null';

    if (psw.length < 8 || psw.length > 72)
        return 'Password must be between 8 and 72 characters long';
    
    const uppercaseRX = /[A-Z]/;
    const lowercaseRX = /[a-z]/;
    const numberRX = /[0-9]/;
    const symbolsRX = /[-\*\+!#$%\^&\(\)\[\]\{\}\\\.\/,<>\?: ]/;

    const allRXs = [uppercaseRX, lowercaseRX, numberRX, symbolsRX];
    for (const rx of allRXs)
        if (!rx.test(psw))
            return 'Passowrd must contain an uppercase, a lowercase, a number and a symbol';
    
    //no error detected
    return '';
}

function checkUsername(username) {
    if (!username || username === '')
        return 'Username empty or null';

    if (username.length < 4 || username.length > 20)
        return 'Username must be between 4 and 20 characters long';

    const userRX = /^[A-Za-z0-9_-]{4,20}$/;
    if (!userRX.test(username))
        return 'Username format not valid';
    
    //no error detected
    return '';
}

export async function LoginController(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    //at least one between username and email
    if ((!username && !email) || !password) {
        console.error(`Invalid email or password or username: |${email}| -- |${password}| -- |${username}|`);
        res.status(400).json('Password and username or email are required').send();
        return;
    }

    //check syntax of parameters    
    let err;
    if (email) {
        err = checkEmail(email);
        if (err) {
            console.error('Invalid email format');
            res.status(400).json(err).send();
            return;
        }
    } else if (username) {
        err = checkUsername(username);
        if (err) {
            console.error('Invalid username format');
            res.status(400).json(err).send();
            return;
        }
    }
    err = checkPassword(password);
    if (err) {
        console.error('Invalid password');
        res.status(400).json(err).send();
        return;
    }
            
    //check if username/email are present
    let user;
    if (username)
        user = await User.findOne( {username: username} );
    else if (email)
        user = await User.findOne( {email: email} );

    if (user) {
        //check if password matches the hash saved
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

export async function RegisterNewUserController(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    if (!email || !password || !username) {
        console.error(`Invalid email or password or username: |${email}| -- |${password}| -- |${username}|`);
        res.status(400).json('Email, password and username are required').send();
        return;
    }

    //check syntax of parameters    
    let err;
    err = checkEmail(email);
    if (err) {
        console.error('Invalid email format');
        res.status(400).json(err).send();
        return;
    }
    err = checkUsername(username);
    if (err) {
        console.error('Invalid username format');
        res.status(400).json(err).send();
        return;
    }
    err = checkPassword(password);
    if (err) {
        console.error('Invalid password');
        res.status(400).json(err).send();
        return;
    }
    
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
