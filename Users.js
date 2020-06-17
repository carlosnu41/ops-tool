const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  nick: {
    type: String,
    unique: true,
    require: true,
  },
  pwd: {
    type: String,
    require: true,
  },
  rank: {
    type: String,
    default: "Normal"
  },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", UserSchema);
