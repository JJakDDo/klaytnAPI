const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const indexRouter = require("./router");

app.use(cors());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});
