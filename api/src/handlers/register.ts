import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import User from '../models/User';

import checkEmail from '../utils/controls/checkEmail';
import checkPassword from '../utils/controls/checkPassword';
import checkUsername from '../utils/controls/checkUsername';


async function register(req: Request, res: Response) {
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
  try {
    const newUser = await new User({ email: email, passwordHash: pswHash, username: username }).save();
    console.log(`${newUser.username} inserted successfully`);
    res.status(200).send();
  } catch (err) {
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
  }
}

export default register;
