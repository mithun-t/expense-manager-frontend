import axios from "axios";
import React, { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpense";
import ExpenseList from "./ExpenseList";
import { Grid, Paper } from "@mui/material";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/categories/");
    setCategories(response.data);
  };

  const fetchExpenses = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/expenses/");
    setExpenses(response.data);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Left Side: Add Expense Form */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <AddExpenseForm
            categories={categories}
            fetchExpenses={fetchExpenses}
          />
        </Paper>
      </Grid>

      {/* Right Side: Expense List */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <ExpenseList expenses={expenses} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ExpensesPage;
