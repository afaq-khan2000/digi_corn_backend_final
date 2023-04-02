const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  pic: { type: String },
  banner: { type: String },
  favorites: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "favorites",
  },
});

module.exports = User = mongoose.model("users", userSchema, "users");
