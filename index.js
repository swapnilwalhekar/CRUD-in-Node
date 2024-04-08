const express = require("express");
require("./config");

const Product = require("./product");
const app = express();
app.use(express.json());

app.post("/add", async (req, res) => {
  const addProduct = new Product(req.body);
  await addProduct.save();
  res.send({
    status: "success",
    message: "product added successfully",
  });
});

const port = 5000;

app.listen(port, () => {
  console.log("ok server is running on port:", port);
});
