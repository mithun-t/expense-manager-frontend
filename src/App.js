// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import ExpenseManager from "./components/ExpenseManager";
import AddCategoryForm from "./components/AddCategoryForm";
import CategoryList from "./components/CategoryList";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpense";
import axios from "axios";

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
        <NavBar />
        <Routes>
          <Route path="/" element={<ExpenseManager />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/categories/");
    setCategories(response.data);
  };

  return (
    <div>
      <AddCategoryForm fetchCategories={fetchCategories} />
      <CategoryList categories={categories} />
    </div>
  );
};

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/categories/");
    setCategories(response.data);
  };
  const fetchExpenses = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/expenses/");
    setExpenses(response.data);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);
  return (
    <div>
      <AddExpenseForm categories={categories} fetchExpenses={fetchExpenses} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default App;
