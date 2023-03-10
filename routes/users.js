const express = require("express");
const {
  signin,
  getProfile,
  signup,
} = require("../controllers/users");
const { requireSignin } = require("../middlewares/auth.js");
const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.get("/profile", requireSignin, getProfile);

module.exports = router;
