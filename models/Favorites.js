const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  nfts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nfts",
    },
  ],
});

module.exports = Favorites = mongoose.model(
  "favorites",
  favoritesSchema,
  "favorites"
);
