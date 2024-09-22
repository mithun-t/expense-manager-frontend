import React, { useState, useEffect } from "react";
import axios from "axios";

const AddExpense = () => {
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState({
    date: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/expenses/", expense)
      .then(() => {
        alert("Expense added successfully!");
        setExpense({ date: "", amount: "", category: "" });
      })
      .catch((error) => {
        console.error("There was an error adding the expense!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        value={expense.amount}
        placeholder="Expense Amount"
        onChange={handleChange}
      />
      <select name="category" value={expense.category} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
