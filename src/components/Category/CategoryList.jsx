import React from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryList = ({ categories, handleDelete }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        maxWidth: 600,
        margin: "auto",
        mt: 4,
      }}
    >
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Category List
        </Typography>
        <Paper sx={{ padding: 2 }}>
          <List dense={true}>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(category.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <CurrencyRupeeSharpIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Paper>
  );
};

export default CategoryList;
