import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  // Extract the token from the Authorization header
  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) return res.status(401).json({ msg: 'Token not found' });

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach the user information to the request object
    next(); // Call the next middleware function
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
