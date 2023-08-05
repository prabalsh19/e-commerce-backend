const mongoose = require("mongoose");
const { cart } = require("../model/cart");
const { products } = require("../model/products");

exports.getCartItemsHandler = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItems = await cart.find({ user: userId });

    res.json({
      success: true,
      cart: cartItems,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.postCartItemHandler = async (req, res) => {
  try {
    const { id: productId } = req.body;
    const itemExist = await cart.findOne({ product: productId });

    if (itemExist) {
      await cart.findByIdAndUpdate(itemExist._id, {
        quantity: itemExist.quantity + 1,
      });

      const cartResponse = await cart
        .find({ email: req.email })
        .populate("product")
        .exec();
      return res.json({ cart: cartResponse });
    }
    const product = await products.findOne({ _id: productId });

    const cartItem = {
      product: product._id,
      quantity: 1,
      price: product.price,
      user: new mongoose.Types.ObjectId(req.userId),
    };

    await cart.create(cartItem);
    const cartResponse = await cart
      .find({ email: req.email })
      .populate("product")
      .exec();
    res.json({ cart: cartResponse });
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteCartItemHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const itemExist = await cart.findOne({ _id: id, user: req.userId });
    if (!itemExist) {
      return res.json({ success: false, message: "Item does not exist" });
    }
    if (itemExist.quantity > 1) {
      await cart.findOneAndUpdate(
        { _id: id },
        { quantity: itemExist.quantity - 1 }
      );
      const cartResponse = await cart.find({ email: req.email });
      return res.json({ cart: cartResponse });
    }
    await cart.findOneAndDelete({ _id: id });
    const cartResponse = await cart.find({ email: req.email });
    return res.json({ cart: cartResponse });
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
