import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const registerUser = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) return res.status(400).json({message: "Email already exists"});

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.json({message: "Registration successful"})
  } catch (err) {
    res.status(400).json({message: err});
  }
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Email does not exist" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ message: "Wrong Password" });

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.TOKEN_SECRET
  );
  res.setHeader("Authorization", `Bearer ${token}`);
  res.json({ message: "Login successful", token });
};

export const logoutUser = async (req, res) => {};
