const express = require("express");
const { dbConnect } = require("./config/db");
const { config } = require("dotenv");
const { auth } = require("./routes/auth");
const { products } = require("./routes/products");
const { categories } = require("./routes/categories");
const { cart } = require("./routes/cart");
const { wishlist } = require("./routes/wishlist");
const cors = require("cors");
config();
dbConnect(() =>
  app.listen(3000, () => console.log("App is listening at port 3000"))
);

const app = express();
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Everthing working fine!");
});

app.use("/api/auth", auth);
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/user/cart", cart);
app.use("/api/user/wishlist", wishlist);
