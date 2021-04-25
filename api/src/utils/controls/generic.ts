import { Response } from 'express';

export function checkEmptyField(field: any, consoleerrMsg: string, message: string, res: Response) {
  if (!field) {
    console.error(consoleerrMsg);
    res.status(400).json(message).send();
    return true;
  }
  return false;
}

export function checkEmptyErr(err: any, consoleerrMsg: string, message: string, res: Response) {
  if (err) {
    console.error(consoleerrMsg);
    res.status(400).json(message).send();
    return true;
  }
  return false;
}