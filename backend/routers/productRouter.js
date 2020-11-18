import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (products) {
      res.send(products);
    } else {
      res.status(404).send({ type: "error", message: "Products not found" });
    }
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      const seller = data.sellers.find((x) => x._id === product.sellerId);
      res.send({ product, seller });
    } else {
      res.status(404).send({ type: "error", message: "Product not found" });
    }
  })
);

export default productRouter;
