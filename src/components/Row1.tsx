import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  CartesianGrid,
  Legend,
  LineChart,
  BarChart,
  Bar,
} from "recharts";
import { useGetKpisQuery } from "@/store/api";
import DashboardBox from "./DashboardBox";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import BoxHeader from "./BoxHeader";

const Row1 = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const newData = useMemo(() => {
    return (
      data &&
      data.monthlyData.map(({ month, revenue, expenses }) => {
        return {
          month: month.substring(0, 3),
          revenue: revenue.toFixed(1),
          expenses: expenses.toFixed(1),
          profit: (revenue - expenses).toFixed(1),
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line represent revenue, bottom line represents expenses"
          sideText="+4%"
          height="15%"
        />
        <ResponsiveContainer width="100%" height="85%">
          {newData && !isLoading ? (
            <AreaChart
              width={500}
              height={400}
              data={newData}
              margin={{
                top: 15,
                right: 25,
                left: -10,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tickLine={false} style={{ fontSize: "10px" }} />
              <YAxis
                tickLine={false}
                axisLine={{ strokeWidth: "0" }}
                style={{ fontSize: "10px" }}
                domain={[8000, 25000]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                dot={true}
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                dot={true}
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          ) : (
            <p>Is loading...</p>
          )}
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Right axis represent revenue, left axis represents profit"
          sideText="+10%"
          height="15%"
        />
        <ResponsiveContainer width="100%" height="85%">
          {data && !isLoading ? (
            <LineChart
              data={newData}
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
              <Tooltip />
              <Legend height={20} wrapperStyle={{ padding: "0 0 10px 0" }} />
              <Line yAxisId="left" dot={false} type="monotone" dataKey="profit" stroke={palette.tertiary[500]} />
              <Line yAxisId="right" dot={false} type="monotone" dataKey="revenue" stroke={palette.primary.main} />
            </LineChart>
          ) : (
            <p>Is loading...</p>
          )}
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="Graph representing the revenue month by month"
          sideText="+4%"
          height="20%"
        />
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={newData}
            margin={{
              top: 17,
              right: 25,
              left: -5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
