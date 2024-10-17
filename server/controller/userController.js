import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/genereteTokens.js";
import { sendEmail } from "../utils/changePassword.js";
import { CustomError } from "../utils/customError.js";
import { validateUserLogin } from "../utils/validations.js";

export const register = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const validation=await validateUserLogin({username, password})

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new CustomError("Userna me already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const { refreshToken, accessToken } = generateTokens(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({
      message: "Registration successful",
      accessToken,
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    //validate the user input using a func, will throw errror by itself if it fails
    const validation=await validateUserLogin({username, password})


    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("Invalid Username or Password", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid Password", 401);
    }

    const { refreshToken, accessToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({
      data: {
        message: "Login successful",
        accessToken,
        user: {
          id: user._id,
          username: user.username,
          bio: user.bio,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
export const editProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { username: newUsername, bio, password } = req.body;

    if (!username || !password) {
      throw new CustomError("Missing required fields", 400);
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid credentials", 400);
    }

 
    if (newUsername) user.username = newUsername;
    if (bio) user.bio = bio;

    await user.save();

    res.status(200).json({
      data: {
        message: "User update successful",
        user: {
          username: user.username,
          bio: user.bio,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({ data: { message: "Logout success ful" } });
  } catch (error) {
    next(new CustomError("Server error", 500));
  }
};
export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new CustomError("No refresh token provided", 403);
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ data: { accessToken: newAccessToken } });
  } catch (error) {
    next(new CustomError("Invalid refresh token", 401));
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { username, token } = req.params;
    
    if (!username || !password || !token) {
      throw new CustomError("Missing required fields", 400);
    }

    const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);

    if (decoded.username !== username) {
      throw new CustomError("User Not Found", 400);
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("User Not Found", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ data: { message: "Password is updated successfully" } });
  } catch (error) {
    next(error);
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { email } = req.body;

    
    if (!username || !email) {
      throw new CustomError("Missing required fields", 400);
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("User Not Found", 400);
    }

    const token = jwt.sign({ username }, process.env.PASSWORD_RESET_SECRET, {
      expiresIn: "5m",
    });

    sendEmail({
      to: email,
      subject: "Reset MovieMate Password",
      html: `
        Reset your password using this link
        http://localhost:5173/reset-password/${username}/${token}`,
    });

    res
      .status(200)
      .json({ data: { message: "Please Check Your Email For Reset Link" } });
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res) => {
  res.send("profile");
};