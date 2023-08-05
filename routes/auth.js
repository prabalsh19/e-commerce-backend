const express = require("express");
const { signupHandler, loginHandler } = require("../controllers/auth");

const auth = express.Router();

auth.post("/signup", signupHandler);
auth.post("/login", loginHandler);

exports.auth = auth;
