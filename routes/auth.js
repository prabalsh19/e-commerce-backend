const express = require("express");
const { signupHandler } = require("../controllers/auth");

const auth = express.Router();

auth.post("/signup", signupHandler);

exports.auth = auth;
