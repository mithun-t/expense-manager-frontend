import React, { useState } from "react";
import axios from "axios";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Paper, Grid, FormControl } from "@mui/material";

const AddExpenseForm = ({ categories, fetchExpenses }) => {
  const [newExpense, setNewExpense] = useState({
    date: dayjs(),
    amount: "",
    category: "",
    description: "",
  });

  const handleAddExpense = async () => {
    if (!newExpense.amount || !newExpense.category) {
      return;
    }
    newExpense.date = `${newExpense.date.$y}-${newExpense.date.$M + 1}-${
      newExpense.date.$D
    }`;
    await axios.post("http://127.0.0.1:8000/api/expenses/", newExpense);
    setNewExpense({ date: dayjs(), amount: "", category: "", description: "" });
    fetchExpenses();
  };

  const handleDateChange = (newValue) => {
    if (newValue) {
      setNewExpense({ ...newExpense, date: newValue });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        margin: "auto",
        mt: 4,
        maxWidth: 800, // Adjust width for better alignment
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <MobileDatePicker
                label="Date"
                value={newExpense.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                required
                fullWidth
                size="small"
                label="Amount"
                variant="outlined"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="category-label"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, category: e.target.value })
                  }
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Description"
                variant="outlined"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
            </Grid>
          </Grid>
        </>
      </LocalizationProvider>
    </Paper>
  );
};

export default AddExpenseForm;
