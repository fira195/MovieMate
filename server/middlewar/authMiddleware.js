import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/customError.js';

export const authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.header('Authorization');
  if (!authHeader) throw new CustomError('No token, authorization denied', 401 );

  // Extract the token from the Authorization header
  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) throw new CustomError('Invalid Token', 401);

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach the user information to the request object
    next(); // Call the next middleware function
  } catch (err) {
    next(err)
  }
};
