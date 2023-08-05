const mongoose = require("mongoose");

exports.dbConnect = (cb) => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((c) => {
      cb();
      console.log("Connected to the db successfully at " + c.connection.host);
    })
    .catch((e) => console.error(e));
};
