const express = require("express");
const { getProducts, getProduct } = require("../controllers/products");

const app = express.Router();

app.get("/", getProducts);
app.get("/:id", getProduct);

exports.products = app;
