const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(401).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      pic: "defaults/user.jpg",
      banner: "defaults/banner.png",
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

    // console.log(!existingUser);
    if (!existingUser)
      return res.status(401).json({ message: "User doesn't exist" });

    // console.log(bcrypt.compare(password, existingUser.password));
    const validPassword = await bcrypt.compare(password, existingUser.password);
    // console.log(validPassword);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    var user = await User.findById(req.token.id);
    if (!user) return res.status(401).json({ error: "User is not registered" });
    res.status(200).json({ user: user });
  } catch (e) {
    res.json({ error: e.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    var user = await User.findById(req.params.id);
    if (!user) return res.json({ error: "User is not registered" });
    // console.log(req.body);
    // console.log(req.files.banner ? "true" : "false");
    if (req.files.pic) {
      // Delete the old file from the server's file system
      const oldPicPath = `./public/uploads/users/${user.pic}`;
      fs.unlinkSync(oldPicPath);
    }
    if (req.files.banner) {
      // Delete the old file from the server's file system
      const oldBannerPath = `./public/uploads/users/${user.banner}`;
      fs.unlinkSync(oldBannerPath);
    }
    var updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      bio,
      pic: req.files.pic ? req.files.pic[0].filename : user.pic,
      banner: req.files.banner ? req.files.banner[0].filename : user.banner,
    });
    res.status(200).json({ user: user, message: "Profile Updated" });
  } catch (e) {
    res.json({ error: e.message });
  }
};
