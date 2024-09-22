import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newExpense, setNewExpense] = useState({
    date: "",
    amount: "",
    category: "",
    description: "",
  });

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

  const handleAddCategory = async () => {
    await axios.post("http://127.0.0.1:8000/api/categories/", {
      name: newCategory,
    });
    setNewCategory("");
    fetchCategories();
  };

  const handleAddExpense = async () => {
    await axios.post("http://127.0.0.1:8000/api/expenses/", newExpense);
    setNewExpense({ date: "", amount: "", category: "", description: "" });
    fetchExpenses();
  };

  return (
    <div>
      <h1>Expense Manager</h1>

      <h2>Add Category</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Category Name"
      />
      <button onClick={handleAddCategory}>Add Category</button>

      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      <h2>Add Expense</h2>
      <input
        type="date"
        value={newExpense.date}
        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
      />
      <input
        type="number"
        value={newExpense.amount}
        onChange={(e) =>
          setNewExpense({ ...newExpense, amount: e.target.value })
        }
        placeholder="Amount"
      />
      <select
        value={newExpense.category}
        onChange={(e) =>
          setNewExpense({ ...newExpense, category: e.target.value })
        }
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newExpense.description}
        onChange={(e) =>
          setNewExpense({ ...newExpense, description: e.target.value })
        }
        placeholder="Description"
      />
      <button onClick={handleAddExpense}>Add Expense</button>

      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.date} - {expense.amount} - {expense.category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
