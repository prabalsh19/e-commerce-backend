const { categories } = require("../model/categories");

exports.getCategories = async (req, res) => {
  try {
    const response = await categories.find({}).lean();
    res.json({
      categories: response,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categories.findById(id);
    res.json({
      category,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
