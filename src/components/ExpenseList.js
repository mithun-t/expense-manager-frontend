import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/expenses/")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the expenses!", error);
      });
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>EMI & Rent</th>
            <th>Home</th>
            <th>Travel</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.Date}</td>
              <td>{expense["EMI & Rent"]}</td>
              <td>{expense.Home}</td>
              <td>{expense.Travel}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
