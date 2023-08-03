const { users } = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
exports.signupHandler = async (req, res) => {
  const { email } = req.body;
  const userExist = await users.findOne({ email });
  if (userExist) {
    return res.json({
      success: false,
      message: "User Already Exist",
    });
  }
  const newUser = req.body;
  newUser._id = uuid();
  newUser.password = await bcrypt.hash(newUser.password, 10);

  await users.create(req.body);
  return res.json({
    success: true,
    message: "User created succesfully",
  });
};

// exports.loginHandler = async(req,res)=>{

// }
