const { products } = require("../model/products");

exports.getProducts = async (req, res) => {
  try {
    const response = await products.find({}).lean();
    res.json({
      products: response,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const product = await products.find({ _id: id });
      res.json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
