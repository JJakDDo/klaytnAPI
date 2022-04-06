const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
const indexRouter = require("./router");

app.use(cors());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});
