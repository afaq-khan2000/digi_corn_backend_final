const express = require("express");
const {
  addNft,
  getNfts,
  getSingleNft,
  updateNft,
  deleteNft,
} = require("../controllers/nfts");
const router = express.Router();
const multer = require("multer");
const { requireSignin } = require("../middlewares/auth");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create an instance of Multer
const upload = multer({ storage: storage });

router.post("/add", requireSignin, upload.single("file"), addNft);
router.get("/", getNfts);
router.get("/:id", getSingleNft);
router.put("/:id", upload.single("file"), updateNft);
router.delete("/:id", deleteNft);

module.exports = router;
