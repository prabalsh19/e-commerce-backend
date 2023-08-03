const mongoose = require("mongoose");

exports.dbConnect = (req, res) => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((c) =>
      console.log("Connected to the db successfully at " + c.connection.host)
    )
    .catch((e) => console.error(e));
};
