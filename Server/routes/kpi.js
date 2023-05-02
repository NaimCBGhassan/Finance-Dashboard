import { Router } from "express";
import KPI from "../models/KPI.js";
const kpiRouter = Router();

kpiRouter.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();

    return res.status(200).json(kpis[0]);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

export default kpiRouter;
