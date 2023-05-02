import { Router } from "express";
import Transaction from "../models/Transactions.js";

const transactionRouter = Router();

transactionRouter.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().limit(50).sort({ createdAt: -1 });

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

export default transactionRouter;
