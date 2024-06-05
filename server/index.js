const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();


app.use(cors());
app.use(bodyParser.json());


app.get("/", (re, res) => {
  return res.json("from backend");
});

app.listen(8081, () => {
  console.log("listening");
});

