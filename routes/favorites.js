const express = require("express");
const {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} = require("../controllers/favorites");
const { requireSignin } = require("../middlewares/auth");
const router = express.Router();

router.post("/add", requireSignin, addToFavorites);
router.delete("/remove/:nftId", requireSignin, removeFromFavorites);
router.get("/", requireSignin, getFavorites);

module.exports = router;
