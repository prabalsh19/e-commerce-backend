const { wishlist } = require("../model/wishlist");

exports.getWishlistHandler = async (req, res) => {
  const response = await wishlist.find({ email: req.email });
  res.json({
    success: true,
    wishlist: response,
  });
};

exports.addToWishlistHandler = async (req, res) => {
  const { id: productId } = req.body;
  const userId = req.userId;
  const wishExist = await wishlist.findOne({ product: productId });
  if (wishExist) {
    return res.json({
      success: false,
      message: "Item already exist in wishlist",
    });
  }
  await wishlist.create({ product: productId, user: userId });

  const response = await wishlist
    .find({ user: req.userId })
    .populate("product")
    .exec();

  res.json({ wishlist: response });
};

exports.deleteWishlistHandler = async (req, res) => {
  const { id: productId } = req.params;
  const wishExist = await wishlist.findOne({ product: productId });
  if (!wishExist) {
    return res.json({
      success: false,
      message: "Item does not exist in wishlist",
    });
  }
  await wishlist.findOneAndDelete(productId);
  const wishlistItems = await wishlist.find({ email: req.email });
  res.json({
    success: true,
    message: "Item deleted successfully",
    wishlist: wishlistItems,
  });
};
