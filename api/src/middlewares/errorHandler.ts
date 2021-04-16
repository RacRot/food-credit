import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  if (!err) return null;

  if (process.env.NODE_ENV !== 'production') console.error(err);

  if (err.render) return err.render(req, res);

  return res.status(500).json({
    message: 'Internal Server Error',
    status: 500,
    errors: [],
  });
};

export default errorHandler;