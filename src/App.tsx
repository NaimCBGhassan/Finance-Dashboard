import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "@/pages/Layout/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Dashboard page</div>,
  },
  {
    path: "/predictions",
    element: <div>Precitions page</div>,
  },
]);

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box component="div" width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar />
          <RouterProvider router={router}></RouterProvider>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
