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

app.get("/", async (req, res) => {
  const allProducts = await Product.find({});

  res.send({
    status: "success",
    allProductList: allProducts,
  });
});

app.put("/update", async (req, res) => {
  await Product.updateOne(
    { _id: req.query.id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
      },
    }
  );

  res.send({
    status: "success",
    message: "Product updated successfully",
  });
});

app.delete("/delete/:id", async (req, res) => {
  const selectedProduct = await Product.find({ _id: req.params.id }); // req.params is a id getting from url
  if (selectedProduct.length === 0) {
    res.status(404).send({
      status: "error",
      message: "Please provide a valid product id",
    });
  } else {
    await Product.deleteOne({ _id: req.params.id });

    res.send({
      status: "success",
      message: "Product deleted successfully",
      deletedProduct: selectedProduct,
    });
  }
});

app.get("/search/:key", async (req, res) => {
  let productData = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });

  productData.length > 0
    ? res.send({
        message: "Search data is available",
        productData,
      })
    : res.send({
        message: "Search not found",
      });
});

const port = 5000;

app.listen(port, () => {
  console.log("ok server is running on port:", port);
});
