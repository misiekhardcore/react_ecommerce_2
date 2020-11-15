import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);

  if (product) {
    const seller = data.sellers.find((x) => x._id === product.sellerId);
    res.send({ product, seller });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server at http://localhost:" + port);
});
