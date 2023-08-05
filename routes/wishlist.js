const { Router } = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  addToWishlistHandler,
  getWishlistHandler,
  deleteWishlistHandler,
} = require("../controllers/wishlist");
const app = Router();

app.get("/", isAuthenticated, getWishlistHandler);
app.post("/", isAuthenticated, addToWishlistHandler);
app.delete("/:id", isAuthenticated, deleteWishlistHandler);

exports.wishlist = app;
