import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import FunctionsIcon from "@mui/icons-material/Functions";

export const EnhancedTableToolbar = ({ selected, expenses }) => {
  const numSelected = selected.length;
  const filteredExpenses = expenses.filter((expense) =>
    selected.includes(expense.id)
  );

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  console.log(filteredExpenses);
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Expense List
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title={totalAmount}>
          <IconButton>
            <FunctionsIcon />
            <Typography variant="h6">{totalAmount}</Typography>
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};
