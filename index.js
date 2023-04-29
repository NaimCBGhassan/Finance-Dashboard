import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRouter from "./routes/kpi.js";
import productRouter from "./routes/product.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import { kpis, products } from "./data/data.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ENVIROMENT VARIABLES */

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 1337;

/* MONGOOSE SETUP */

(async () => {
  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(MONGODB_URI);

    /* ADD DATA ONCE ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase();
    //KPI.insertMany(kpis);
    //Product.insertMany(products);
    console.log(`DB connected to ${db.connection.name}`);
  } catch (error) {
    console.log("DB connection failed");
    console.log(error);
  }
})();

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

/* ROUTES */

app.use("/kpi", kpiRouter);
app.use("/product", productRouter);
