// src/components/NavBar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = ({ toggleTheme }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Manager
        </Typography>
        <Button onClick={toggleTheme}>Theme</Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/categories">
          Categories
        </Button>
        <Button color="inherit" component={Link} to="/expenses">
          Expenses
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
