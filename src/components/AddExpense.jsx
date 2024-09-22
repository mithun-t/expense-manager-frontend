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

const AddExpenseForm = ({ categories, fetchExpenses }) => {
  const [newExpense, setNewExpense] = useState({
    date: dayjs(),
    amount: "",
    category: "",
    description: "",
  });

  const handleAddExpense = async () => {
    console.log(newExpense);
    newExpense.date = `${newExpense.date.$y}-${newExpense.date.$M + 1}-${
      newExpense.date.$D
    }`;
    await axios.post("http://127.0.0.1:8000/api/expenses/", newExpense);
    setNewExpense({ date: dayjs(), amount: "", category: "", description: "" });
    fetchExpenses();
  };

  const handleDateChange = (newValue) => {
    if (newValue) {
      setNewExpense({ ...newExpense, date: newValue }); // Keep as Dayjs object
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <h2>Add Expense</h2>
        <MobileDatePicker
          label="Date"
          value={newExpense.date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <TextField
          fullWidth
          size="small"
          label="Amount"
          variant="outlined"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          sx={{ my: 2 }}
        />
        <InputLabel id="category-label">Category</InputLabel>
        <Select
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
        <TextField
          fullWidth
          size="small"
          label="Description"
          variant="outlined"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
          sx={{ my: 2 }}
        />
        <Button variant="contained" onClick={handleAddExpense}>
          Add Expense
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default AddExpenseForm;
