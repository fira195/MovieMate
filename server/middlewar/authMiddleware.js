import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/customError.js';

export const authenticate = (req, res, next) => {

  if (!req.path.endsWith('/protected'))return next()
  console.log('protexted')
  
  // Get the token from header
  const authHeader = req.header('Authorization');
  console.log(authHeader)
  if (!authHeader) throw new CustomError('No token, authorization denied', 401 );

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) throw new CustomError('Invalid Token', 401);

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next(); 
  } catch (err) {
    next(err)
  }
};
