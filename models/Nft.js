const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nftSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    // required: true,
  },
  price: { type: Number, required: true },
  file: {
    type: String,
     required: true
  },
});

module.exports = Nft = mongoose.model("nfts", nftSchema, "nfts");
