const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nftSchema = new Schema({
  tokenId: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
  file: {
    type: String,
    required: true,
  },
  // smartContract: {
  //   address: {
  //     type: String,
  //     required: true,
  //   },
  //   owner: {
  //     type: String,
  //     required: true,
  //   },
  //   royalties: {
  //     type: Number,
  //     required: true,
  //   },
  //   transferable: {
  //     type: Boolean,
  //     required: true,
  //   },
  // },
  // blockchain: {
  //   network: {
  //     type: String,
  //     required: true,
  //   },
  //   chainID: {
  //     type: Number,
  //     required: true,
  //   },
  //   blockHash: {
  //     type: String,
  //     required: true,
  //   },
  //   timestamp: {
  //     type: Date,
  //     required: true,
  //   },
  // },
});

module.exports = Nft = mongoose.model("nfts", nftSchema, "nfts");
