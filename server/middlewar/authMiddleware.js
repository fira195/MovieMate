import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/customError.js';

export const authenticate = (req, res, next) => {

  if (!req.path.endsWith('/protected'))return next()
  
  // Get the token from header
  const authHeader = req.header('Authorization');

  if (!authHeader) throw new CustomError('No token, authorization denied', 403 );

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) throw new CustomError('Invalid Token', 403);

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next(); 
  } catch (err) {
    next({err, statusCode: 403})
  }
};
