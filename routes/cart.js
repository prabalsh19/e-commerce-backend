const { Router } = require("express");
const {
  getCartItemsHandler,
  postCartItemHandler,
  deleteCartItemHandler,
} = require("../controllers/cart");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const app = Router();

app.get("/", isAuthenticated, getCartItemsHandler);
app.post("/", isAuthenticated, postCartItemHandler);
app.delete("/:id", isAuthenticated, deleteCartItemHandler);

exports.cart = app;
