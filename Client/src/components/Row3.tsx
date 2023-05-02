import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/store/api";
import DashboardBox from "./DashboardBox";
import { useMemo } from "react";
import BoxHeader from "./BoxHeader";
import { Box, useTheme, Typography } from "@mui/material";
import { GridCellParams, DataGrid } from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const { data: kpisData } = useGetKpisQuery();
  const { data: productsData, isLoading: loadingProducts } = useGetProductsQuery();
  const { data: transactionsData, isLoading: loadingTransactions } = useGetTransactionsQuery();

  const newKpisData = useMemo(() => {
    if (kpisData) {
      const totalExpenses = kpisData.totalExpenses;
      return Object.entries(kpisData.expensesByCategory).map(([key, value]) => [
        {
          name: key[0].toUpperCase() + key.substring(1),
          value: value,
        },
        {
          name: `${key} of Total`,
          value: totalExpenses - value,
        },
      ]);
    }
  }, [kpisData]);

  const newProductsData = useMemo(() => {
    if (productsData) {
      return productsData.map((data) => {
        return {
          id: data._id,
          price: +data.price.toFixed(1),
          expense: +data.expense.toFixed(1),
        };
      });
    }
  }, [productsData]);

  const newTransactionsData = useMemo(() => {
    if (transactionsData) {
      return transactionsData.map((data) => {
        return {
          id: data._id,
          buyer: data.buyer,
          amount: +data.amount.toFixed(1),
          productIds: data.productIds,
        };
      });
    }
  }, [transactionsData]);

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="List of Products" sideText={`${productsData?.length} products`} height="20%" />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          pb="1rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `2px solid ${palette.grey[500]} !important`,
              fontSize: "0.9rem",
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={newProductsData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader title="Recent Orders" sideText={`${newTransactionsData?.length} latest transactions`} height="15%" />
        <Box
          mt="1rem"
          p="0 0.5rem"
          pb="1.5rem"
          height="85%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `2px solid ${palette.grey[600]} !important`,
              fontSize: "0.9rem",
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={newTransactionsData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+10%" height="25%" />

        <FlexBetween gap="0.5rem" p="0.5rem 1rem" height="75%" textAlign="center">
          {newKpisData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie stroke="none" data={data} innerRadius={18} outerRadius={38} paddingAngle={2} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader title="Overall Summary and Explanation Data" sideText="+15%" height="25%" />
        <Box height="15px" margin="0.5rem 1rem 0.4rem 1rem" bgcolor={palette.primary[800]} borderRadius="1rem">
          <Box height="15px" bgcolor={palette.primary[600]} borderRadius="1rem" width="40%"></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam ullamcorper odio sed. Ipsum non sed
          gravida etiam urna egestas molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare sed. In
          volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;

const productColumns = [
  {
    field: "id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "expense",
    headerName: "Expense",
    flex: 0.5,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 0.5,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
];

const transactionColumns = [
  {
    field: "id",
    headerName: "id",
    flex: 0.8,
  },
  {
    field: "buyer",
    headerName: "Buyer",
    flex: 0.67,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.35,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
  {
    field: "productIds",
    headerName: "Count",
    flex: 0.2,
    renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
  },
];
