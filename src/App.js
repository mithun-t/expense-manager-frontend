// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import ExpenseManager from "./components/ExpenseManager";
import CategoriesPage from "./components/CategoriesPage";
import ExpensesPage from "./components/ExpensesPage";

const App = () => {
  const [themeMode, setThemeMode] = useState("dark");

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar toggleTheme={toggleTheme} isDarkMode={themeMode === "dark"} />
        <Routes>
          <Route path="/" element={<ExpenseManager />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
