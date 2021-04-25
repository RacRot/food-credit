import mongoose from 'mongoose';
import { Request, Response } from 'express';

import Credits from '../models/Credits';
import { checkEmptyField } from '../utils/controls/generic';

async function newCredit(req: Request, res: Response) {
  const food: string = req.body.food;
  const quantity: number = req.body.quantity;
  //const quantityType: string = req.body.quantityType;
  const creditor = req.body.creditor;
  const debtor = req.body.debtor;
  const createdAt: Date = new Date();

  if (
    checkEmptyField(food, 'Food field is missing', 'Food is required', res) ||
    checkEmptyField(quantity, 'Quantity field is missing', 'Quantity is required', res) ||
    checkEmptyField(creditor, 'Creditor field is missing', 'Creditor is required', res) ||
    checkEmptyField(debtor, 'Debtor field is missing', 'Debtor is required', res) 
  ) 
    return;

  //TODO: check validity of fields

  try {
    const newCredit = await new Credits( {
      food: food,
      quantity: quantity,
      creditor: mongoose.Types.ObjectId(creditor),
      debtor: mongoose.Types.ObjectId(debtor),
      createdAt: createdAt,
    } ).save();
    console.log(`generated successfully new credit between ${newCredit.creditor} and ${newCredit.debtor}`);
    res.status(200).send();
  } catch (err) {
    const msg: string = err.message;
    console.error(`credit not inserted, some error occurred: ${msg}`);
    res.status(500).json(`Some error occurred: ${msg}`);
  }
}

export default newCredit;