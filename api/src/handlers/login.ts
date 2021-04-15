import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import User, { IUser } from '../models/User';

import checkEmail from '../utils/controls/checkEmail';
import checkPassword from '../utils/controls/checkPassword';
import checkUsername from '../utils/controls/checkUsername';

async function login(req: Request, res: Response) {
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
  let user: IUser;
  if (username)
      user = await User.findOne( {username: username} );
  else if (email)
      user = await User.findOne( {email: email} );
  else throw new Error('Missing field to identify user');

  if (user) {
      //check if password matches the hash saved
      if (!user.passwordHash) throw new Error('')
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
