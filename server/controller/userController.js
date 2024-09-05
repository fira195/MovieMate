import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/genereteTokens.js";
import { sendEmail } from "../utils/changePassword.js";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username && !password)
      return res.status(401).json({ message: "Invalid User Information" });

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const { refreshToken, accessToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
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
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const { username: newUsername, bio, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ data: { message: "Missing required fields" } });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ data: { message: "Invalid credentials" } });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ data: { message: "Invalid credentials" } });
    }
    if (!newUsername && !bio) {
      return res
        .status(400)
        .json({ data: { message: "No fields to update provided" } });
    }

    if (newUsername) user.username = newUsername;
    if (bio) user.bio = bio;

    await user.save();

    res.status(200).json({
      data: {
        message: "User Update successful",
        user: {
          username: user.username,
          bio: user.bio,
        },
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: { message: "Server Error" } });
  }
};
export const profile = async (req, res) => {
  res.send("profile");
};

export const logout = (req, res) => {
  try {
    // Clear the refreshToken cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({ data: { message: "Logout successful" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: { message: "Server error" } });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 60 }
    );

    res.json({ accessToken: newAccessToken });
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { username, token } = req.params;

    // Verify the token
    const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);

    // Check if the token's username matches the request's username
    if (decoded.username !== username) {
        return res.status(400).json({ data: { message: "User Not Found" } });
    }

    // Await the result of finding the user
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ data: { message: "User Not Found" } });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user document
    await user.save();

    // Respond with success
    res.status(200).json({ data: { message: 'Password is updated successfully' } });
} catch (e) {
    console.log(e);
    res.status(500).json({ data: { message: "Server Error" } });
}

};

export const forgotPassword = (req, res) => {
  try {
    const { username } = req.params;
    const { email } = req.body;

    const user = User.findOne({ username });
    if (!user)
      return res.status(400).json({ data: { message: "User Not Found" } });

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
    res.status(200).json({data: {message: 'Please Check Your Email For Reset Link'}})
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: { message: "Server Error" } });
  }
};
