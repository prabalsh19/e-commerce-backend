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
  newUser.password = await bcrypt.hash(newUser.password, 10);
  const encodedToken = jwt.sign(
    { email: newUser.email },
    process.env.JWT_SECRET
  );

  await users.create(req.body);

  delete newUser.password;
  return res.json({
    success: true,
    message: "User created succesfully",
    user: newUser,
    encodedToken,
  });
};

exports.loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await users.findOne({ email });

  if (!userExist) {
    return res.json({
      success: false,
      message: "User does not exist",
    });
  }

  const checkPass = await bcrypt.compare(password, userExist.password);
  if (!checkPass) {
    return res.json({
      success: false,
      message: "Password does not match",
    });
  }
  const encodedToken = jwt.sign(
    { email: userExist.email },
    process.env.JWT_SECRET
  );

  userExist.password = undefined;
  userExist.save();

  res.json({
    success: true,
    message: "Succesfully loggedin",
    encodedToken,
    user: userExist,
  });
};
