const express = require("express");
const {
  signin,
  getProfile,
  signup,
  updateProfile,
} = require("../controllers/users");
const { requireSignin } = require("../middlewares/auth.js");
const router = express.Router();
const multer = require("multer");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create an instance of Multer
const upload = multer({ storage: storage });

router.post("/register", signup);
router.post("/login", signin);
router.get("/profile", requireSignin, getProfile);
router.put(
  "/profile/update/:id",

  upload.fields([
    { name: "pic", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;
