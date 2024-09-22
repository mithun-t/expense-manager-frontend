import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCategoryForm from "./AddCategoryForm";
import CategoryList from "./CategoryList";

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
    <>
      <AddCategoryForm fetchCategories={fetchCategories} />
      <CategoryList categories={categories} />
    </>
  );
};

export default CategoriesPage;
