import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import User from '../models/User';

import checkEmail from '../utils/controls/checkEmail';
import checkPassword from '../utils/controls/checkPassword';
import checkUsername from '../utils/controls/checkUsername';
import { checkEmptyErr, checkEmptyField } from '../utils/controls/generic';


async function register(req: Request, res: Response) {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const username: string = req.body.username;

  let consoleerrMsg: string = `Invalid email or password or username: |${email}| -- |${password}| -- |${username}|`;
  let errMsg: string = 'Email, password and username are required';
  if (
    checkEmptyField(email, consoleerrMsg, errMsg, res) ||
    checkEmptyField(password, consoleerrMsg, errMsg, res) ||
    checkEmptyField(username, consoleerrMsg, errMsg, res)
  )
    return;

  //check syntax of parameters    
  let err: string;
  err = checkEmail(email);
  if (checkEmptyErr(err, 'Invalid email format', err, res))
    return;
  err = checkUsername(username);
  if (checkEmptyErr(err, 'Invalid username format', err, res))
    return;
  err = checkPassword(password);
  if (checkEmptyErr(err, 'Invalid password', err, res))
    return;

  //generate hash for password
  const salt: string | number = await bcrypt.genSalt(10);
  const pswHash: string = await bcrypt.hash(password, salt);

  //generate and save user
  try {
    const newUser = await new User({ email: email, passwordHash: pswHash, username: username }).save();
    console.log(`${newUser.username} inserted successfully`);
    res.status(200).send();
  } catch (err) {
    const msg: string = err.message;
    console.error(`user not inserted, some error occurred: ${msg}`);

    let errorMsg: string;
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
