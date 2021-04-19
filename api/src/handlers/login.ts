import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import User, { IUser } from '../models/User';

import checkEmail from '../utils/controls/checkEmail';
import checkPassword from '../utils/controls/checkPassword';
import checkUsername from '../utils/controls/checkUsername';
import { checkEmptyErr, checkEmptyField } from '../utils/controls/generic';

async function login(req: Request, res: Response) {
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  //at least one between username and email
  if ((!username && !email) || !password) {
    console.error(`Invalid email or password or username: |${email}| -- |${password}| -- |${username}|`);
    res.status(400).json('Password and username or email are required').send();
    return;
  }

  //check syntax of parameters    
  let err: string;
  if (email) {
    err = checkEmail(email);
    if (checkEmptyErr(err, 'Invalid email format', err, res))
      return;
  } else if (username) {
    err = checkUsername(username);
    if (checkEmptyErr(err, 'Invalid username format', err, res))
      return;
  }
  err = checkPassword(password);
  if (checkEmptyErr(err, 'Invalid password', err, res))
      return;

  //check if username/email are present
  let user: IUser;
  if (username)
    user = await User.findOne({ username: username });
  else if (email)
    user = await User.findOne({ email: email });
  else throw new Error('Missing field to identify user');

  if (user) {
    //check if password matches the hash saved
    if (!user.passwordHash) throw new Error('Missing field in user structure');
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

export default login;
