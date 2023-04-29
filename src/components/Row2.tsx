import { useGetKpisQuery, useGetProductsQuery } from "@/store/api";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import DashboardBox from "./DashboardBox";
import BoxHeader from "./BoxHeader";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FlexBetween from "./FlexBetween";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: kpisData, isLoading: loadingKpis } = useGetKpisQuery();
  const { data: productsData, isLoading: loadingProducts } = useGetProductsQuery();

  const newKpisData = useMemo(() => {
    if (kpisData) {
      return kpisData.monthlyData.map((data) => {
        return {
          month: data.month.substring(0, 3),
          "Operational Expenses": data.operationalExpenses.toFixed(0),
          "Non Operational Expenses": data.nonOperationalExpenses.toFixed(0),
        };
      });
    }
  }, [kpisData]);
  /* 
  const newProductsData = useMemo(() => {
    if (productsData) {
      return productsData.monthlyData.map((data) => {
        return {
          month: data.month.substring(0, 3),
          "Operational Expenses": data.operationalExpenses.toFixed(0),
          "Non Operational Expenses": data.nonOperationalExpenses.toFixed(0),
        };
      });
    }
  }, [productsData]); */

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader title="Operational vs Non-Operational Expenses" sideText="+10%" height="15%" />
        <ResponsiveContainer width="100%" height="85%">
          {kpisData && !loadingKpis ? (
            <LineChart
              data={newKpisData}
              margin={{
                top: 15,
                right: 25,
                left: -10,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis dataKey="month" tickLine={false} style={{ fontSize: "10px" }} />
              <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px" }}
              />
              <Tooltip />{" "}
              <Line
                yAxisId="left"
                dot={true}
                type="monotone"
                dataKey="Operational Expenses"
                stroke={palette.tertiary[500]}
              />
              <Line
                yAxisId="right"
                dot={true}
                type="monotone"
                dataKey="Non Operational Expenses"
                stroke={palette.primary.main}
              />
            </LineChart>
          ) : (
            <p>Is loading...</p>
          )}
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Campaing and Targets" sideText="+10%" height="15%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem"></FlexBetween>
        <PieChart width={110} height={100} margin={{ top: 0, right: -10, left: 10, bottom: 0 }}>
          <Pie stroke="none" data={pieData} innerRadius={18} outerRadius={38} paddingAngle={2} dataKey="value">
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index]} />
            ))}
          </Pie>
        </PieChart>
      </DashboardBox>
      <DashboardBox gridArea="f">f</DashboardBox>
    </>
  );
};

export default Row2;
