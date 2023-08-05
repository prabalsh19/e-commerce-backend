const express = require("express");
const { getCategories, getCategory } = require("../controllers/categories");

const app = express.Router();

app.get("/", getCategories);
app.get("/:id", getCategory);

exports.categories = app;
