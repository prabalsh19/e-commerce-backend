const { categories } = require("../model/categories");

exports.getCategories = async (req, res) => {
  const response = await categories.find({}).lean();
  res.json({
    categories: response,
  });
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await categories.findById(id);
  res.json({
    category,
  });
};
