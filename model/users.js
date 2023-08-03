const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: {
    type: String,
    default: Date.now(),
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
});

exports.users = mongoose.model("users", schema);
