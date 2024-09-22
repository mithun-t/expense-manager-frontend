import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryMaster = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

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

  const handleAddCategory = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/categories/", { name: categoryName })
      .then(() => {
        setCategories([...categories, { name: categoryName }]);
        setCategoryName("");
      })
      .catch((error) => {
        console.error("There was an error adding the category!", error);
      });
  };

  return (
    <div>
      <h2>Category Master</h2>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          value={categoryName}
          placeholder="Enter category name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMaster;
