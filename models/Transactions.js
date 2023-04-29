import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    buyer: {
      type: Number,
      currency: "U$D",
    },
    amount: {
      type: Number,
      currency: "U$D",
    },
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Transaction", TransactionSchema);
