import { useGetKpisQuery, useGetProductsQuery } from "@/store/api";
import { useMemo } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
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
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
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
  const { data: productsData, isLoading: loadingProducts, isError } = useGetProductsQuery();

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

  const newProductsData = useMemo(() => {
    if (productsData) {
      return productsData.map((data) => {
        return {
          _id: data._id,
          price: +data.price.toFixed(1),
          expense: +data.expense.toFixed(1),
        };
      });
    }
  }, [productsData]);

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
          ) : !isError ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h3">Server Error</Typography>
            </Box>
          )}
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Campaing and Targets" sideText="+10%" height="25%" />
        <FlexBetween mt="0.20rem" gap="1.5rem" pr="1rem" height="75%">
          <PieChart width={110} height={100} margin={{ top: 0, right: -10, left: 10, bottom: 0 }}>
            <Pie stroke="none" data={pieData} innerRadius={18} outerRadius={38} paddingAngle={2} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">Finance goals of the campaign that is desired</Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography variant="h5" mt="0.4rem">
              Profit Margins
            </Typography>
            <Typography variant="h6">Margins are up by 30% from last month</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+10%" height="15%" />
        {productsData && !loadingProducts ? (
          <ResponsiveContainer width="100%" height="85%">
            <ScatterChart
              margin={{
                top: 20,
                right: 25,
                bottom: 20,
                left: 0,
              }}
            >
              <CartesianGrid stroke={palette.primary[800]} />
              <XAxis
                type="number"
                dataKey="price"
                name="Price"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "10px" }}
                tickFormatter={(v) => `$${v}`}
              />
              <YAxis
                type="number"
                dataKey="expense"
                name="Expense"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "10px" }}
                tickFormatter={(v) => `$${v}`}
              />
              <ZAxis type="number" range={[20]} />
              <Tooltip formatter={(v) => `$${v}`} />
              <Scatter name="Product Expense Ratio" data={newProductsData} fill={palette.tertiary[500]} />
            </ScatterChart>
          </ResponsiveContainer>
        ) : !isError ? (
          <Box height="85%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box height="85%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h3">Server Error</Typography>
          </Box>
        )}
      </DashboardBox>
    </>
  );
};

export default Row2;
