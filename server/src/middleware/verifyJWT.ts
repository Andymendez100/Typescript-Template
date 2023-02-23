import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = (req.headers.authorization as string) || (req.headers.Authorization as string);
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.UserInfo.username;
    return next();
  } catch (error) {
    return res.sendStatus(403); // invalid token
  }
};

module.exports = verifyJWT;
