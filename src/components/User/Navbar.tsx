import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { autoLogin } from "../../service/Login-Register/Login_Register";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC0CB",
    },
  },
});

export default function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(autoLogin());
    } else {
      navigate("/login");
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography variant="h6" noWrap component="div">
              KayBook
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
