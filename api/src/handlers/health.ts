import { Request, Response } from 'express';

const health = async (_req: Request, res: Response) => res.json('OK');

export default health;
