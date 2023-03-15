const mongoose = require("mongoose");
const Nft = require("../models/Nft");

const fs = require("fs");
const path = require("path");

exports.addNft = async (req, res) => {
  const { name, description, price, owner } = req.body;
  // console.log(req.body);
  // console.log(req.file);
  try {
    const nft = new Nft({
      name,
      description,
      price,
      owner,
      latestBid: price,
      file: req.file.filename,
    });
    await nft.save();
    res.status(200).json("NFT Minted Successfully ");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getNfts = async (req, res) => {
  try {
    const nfts = await Nft.find().sort({ date: -1 });
    res.status(200).json({ nfts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getSingleNft = async (req, res) => {
  try {
    const nft = await Nft.findById(req.params.id);
    res.status(200).json({ nft });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateNft = async (req, res) => {
  const { name, description, createdBy, price } = req.body;
  const file = req.file ? req.file.filename : req.body.file;
  const nft = await Nft.findById(req.params.id);
  if (req.file) {
    // Delete the old file from the server's file system
    const oldFilePath = `./public/uploads/${nft.file}`;
    fs.unlinkSync(oldFilePath);
  }

  try {
    const updatedNft = await Nft.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      file,
    });
    res.status(200).json({ updatedNft });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteNft = async (req, res) => {
  try {
    const nft = await Nft.findById(req.params.id);
    // Delete the old file from the server's file system
    const oldFilePath = `./public/uploads/${nft.file}`;
    fs.unlinkSync(oldFilePath);
    await nft.delete();
    res.status(200).json({ nft });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
