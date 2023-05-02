import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/store/api";
import { useTheme, Box, Typography, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Label } from "recharts";
import { DataPoint, linear } from "regression";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState<boolean>(false);
  const { data, isLoading } = useGetKpisQuery();

  const newData = useMemo(() => {
    if (!data) return [];

    const monthData = data.monthlyData;
    const formatted: DataPoint[] = monthData.map(({ revenue }, i: number) => [i, revenue]);
    const regressionLine = linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month.substring(0, 3),
        "Actual Revenue": +revenue.toFixed(),
        "Regression Line": +regressionLine.points[i][1].toFixed(),
        "Predicted Revenue": +regressionLine.predict(i + 12)[1].toFixed(),
      };
    });
  }, [data]);

  return (
    <DashboardBox width="100%" height="85vh" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            Charted revenue and predicated revenue based on a simple linear regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          Show Predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="85%">
        {data && !isLoading ? (
          <LineChart
            data={newData}
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
              yAxisId="left"
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[12000, 26000]}
              tickFormatter={(v) => `$${v}`}
            >
              <Label value="Revenue U$D" offset={-5} angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" height={40} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line yAxisId="left" type="monotone" dataKey="Regression Line" stroke="#8884d8" dot={false} />
            {isPredictions && (
              <Line
                yAxisId="left"
                type="monotone"
                strokeDasharray="5 5"
                dataKey="Predicted Revenue"
                stroke={palette.secondary[500]}
              />
            )}
          </LineChart>
        ) : (
          <p>Is loading...</p>
        )}
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
