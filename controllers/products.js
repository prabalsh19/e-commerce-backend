const { products } = require("../model/products");

exports.getProducts = async (req, res) => {
  const response = await products.find({}).lean();
  res.json({
    products: response,
  });
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await products.find({ _id: id });
    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
