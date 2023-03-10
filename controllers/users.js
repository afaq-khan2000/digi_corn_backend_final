const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(201).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(201).json({ message: "User doesn't exist" });

    if (!bcrypt.compare(password, existingUser.password))
      return res.status(201).json({ message: "Invalid password" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    var user = await User.getById(req.token.id);
    if (!user) return res.json({ error: "User is not registered" });
    res.status(200).json({ user: user });
  } catch (e) {
    res.json({ error: e.message });
  }
};
