import Jwt from "jsonwebtoken";

export const generateTokens = ({ user }) => {
  const refreshToken = Jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  const accessToken = Jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h ',
  });
  return { refreshToken, accessToken };
};
