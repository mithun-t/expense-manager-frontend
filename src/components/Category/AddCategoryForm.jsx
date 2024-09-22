import React, { useState } from "react";
import axios from "axios";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const AddCategoryForm = ({ fetchCategories }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    await axios.post("http://127.0.0.1:8000/api/categories/", {
      name: newCategory,
    });
    setNewCategory("");
    fetchCategories();
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          maxWidth: 600,
          margin: "auto",
          mt: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add Category
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              size="small"
              label="Category"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddCategory}
              sx={{ height: "100%" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default AddCategoryForm;
