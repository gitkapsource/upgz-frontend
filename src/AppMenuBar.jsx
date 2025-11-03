import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useLocation } from "react-router-dom";

const AppMenuBar = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

        <Box>
          <Button
            color={location.pathname === "/" ? "secondary" : "inherit"}
            component={Link}
            to="/"
          >
            PhoneNumber Management
          </Button>

          <Button
            color={location.pathname === "/sip-trunks" ? "secondary" : "inherit"}
            component={Link}
            to="/sip-trunks"
          >
            SIP Trunk Management
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppMenuBar;

