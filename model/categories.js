const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  alt: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

exports.categories = mongoose.model("categories", schema);
