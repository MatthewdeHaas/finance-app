import { useState, useEffect } from 'react';
import { FormControl, TextField, Button, Select, InputLabel, MenuItem, RadioGroup, FormControlLabel, Radio, Box, Typography, } from '@mui/material';

const CreateBudget = ({

}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [threshold, setThreshold] = useState("");
  const [period, setPeriod] = useState("");
  const [message, setMessage] = useState("");


  const create = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/budget/create`, {
      method: "POST",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        category: selectedCategory,
        threshold: threshold,
        period: period
      })
    });

    setMessage(`Budget of $${threshold} placed on ${selectedCategory}`)
  };


  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/api/category`, { 
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    })
    .then(res => res.json())
    .then(data => {
        setCategories(data);
      })
    .catch(err => {
        console.log("Error fetching categories")
      });

  }, []);
  

return (
    <Box
      component="form"
      onSubmit={create}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 2,
        backgroundColor: "background.paper",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold" textAlign="center">
        Create New Budget
      </Typography>

      {/* Category */}
      <FormControl fullWidth required>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((acc, i) => (
            <MenuItem key={i} value={acc.name}>
              {acc.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Threshold */}
      <TextField
        label="Threshold"
        type="number"
        value={threshold}
        required
        onChange={(e) => setThreshold(e.target.value)}
        fullWidth
        inputProps={{ min: 0 }}
      />

      {/* Period */}
      <FormControl component="fieldset">
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Period
        </Typography>
        <RadioGroup
          row
          name="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
          <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
        </RadioGroup>
      </FormControl>

      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ alignSelf: "center", px: 4 }}
      >
        Create Budget
      </Button>

      {/* Feedback */}
      {message && (
        <Typography
          variant="body2"
          color={"success.main"}
          textAlign="center"
        >
          {message}
        </Typography>
      )}
    </Box>
  );

};

export default CreateBudget;
