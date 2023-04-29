import { Router } from "express";
import Product from "../models/Product.js";
const productRouter = Router();

productRouter.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

export default productRouter;
