import { model, Schema } from "mongoose";

const monthSchema = new Schema({
  month: String,
  revenue: {
    type: Number,
    currency: "U$D",
  },
  expenses: {
    type: Number,
    currency: "U$D",
  },
  operationalExpenses: {
    type: Number,
    currency: "U$D",
  },
  nonOperationalExpenses: {
    type: Number,
    currency: "U$D",
  },
});

const dailySchema = new Schema({
  date: String,
  revenue: {
    type: Number,
    currency: "U$D",
  },
  expenses: {
    type: Number,
    currency: "U$D",
  },
});

const KPISchema = new Schema(
  {
    totalProfit: {
      type: Number,
      currency: "U$D",
    },
    totalRevenue: {
      type: Number,
      currency: "U$D",
    },
    totalExpenses: {
      type: Number,
      currency: "U$D",
    },
    expensesByCategory: {
      type: Map,
      of: {
        type: Number,
        currency: "U$D",
      },
    },
    monthlyData: [monthSchema],
    dailyData: [],
  },
  {
    timestamps: true,
  }
);

export default model("KPI", KPISchema);
