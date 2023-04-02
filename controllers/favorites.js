const mongoose = require("mongoose");
const Favorites = require("../models/Favorites");
const User = require("../models/User");

const fs = require("fs");
const path = require("path");
const Nft = require("../models/Nft");

exports.addToFavorites = async (req, res) => {
  try {
    const userId = req.token.id;
    const { nftId } = req.body;
    const favorites = await Favorites.findOne({ userId });

    if (favorites) {
      if (favorites.nfts.includes(nftId)) {
        return res
          .status(400)
          .json({ message: "Product already added to favorites" });
      }

      favorites.nfts.push(nftId);
      await favorites.save();

      return res.status(200).json({ message: "Product added to favorites" });
    }

    const newFavorites = new Favorites({
      userId,
      nfts: [nftId],
    });

    await newFavorites.save();

    const user = await User.findById(userId);
    user.favorites = newFavorites._id;
    await user.save();

    return res.status(200).json({ message: "Product added to favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.removeFromFavorites = async (req, res) => {
  try {
    const nftId = req.params.nftId;
    const userId = req.token.id;

    const favorites = await Favorites.findOne({ userId });
    

    // Remove the product ID from the favorites document's products array
    favorites.nfts = favorites.nfts.filter((id) => id.toString() !== nftId);

    // Save the updated user and favorites document
    await favorites.save();

    res.status(200).json({ message: "Removed from Favorites" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorites.find({ userId: req.token.id }).populate(
      "nfts"
    );
    // console.log(favorites);
    res.json({ favorites });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
