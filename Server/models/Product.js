import { Schema, model } from "mongoose";

const ProductsSchema = new Schema(
  {
    price: {
      type: Number,
      currency: "U$D",
    },
    expense: {
      type: Number,
      currency: "U$D",
    },
    transactionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Product", ProductsSchema);
