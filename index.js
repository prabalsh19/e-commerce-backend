const express = require("express");
const { dbConnect } = require("./config/db");
const { config } = require("dotenv");
const { auth } = require("./routes/auth");

config();
dbConnect();

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("App is listening at port 3000"));

app.get("/", (req, res) => {
  res.send("Everthing working fine!");
});
app.use("/api/auth", auth);
