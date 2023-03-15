const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.requireSignin = (req, res, next) => {
  try {
    // console.log(req.headers["x-auth-token"]);
    const token = req.headers['x-auth-token'];
    // console.log(token);
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) return res.status(401).json({ message: "Token is not valid" });
    req.token = data;
    next();
  } catch {
    res.status(401).json({ message: "Token is not valid" });
  }
};
