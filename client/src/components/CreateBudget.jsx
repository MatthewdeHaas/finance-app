import { useState, useEffect } from 'react';
import { FormControl, TextField, Button, Select, InputLabel, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const CreateBudget = () => {
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

    setMessage(`Budget of ${threshold} placed on ${selectedCategory}`)
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
    <form onSubmit={create}>
      <FormControl>
    
        <FormControl>

          {/* Category */}
          <InputLabel>Category</InputLabel>
          <Select
            id="category-select"
            required
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            {categories.map((acc, i) => (   
            <MenuItem key={i} value={acc.name}>{acc.name}</MenuItem>
              )
            )}
          </Select>

        </FormControl>

        {/* Limit */}
        <TextField
          label="Threshold"
          type="number"
          value={threshold}
          required
          onChange={(e) => setThreshold(e.target.value)}
          fullWidth
          inputProps={{ min: 0}}
          sx={{
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
        >      
        </TextField>

        <FormControl>

          {/* period */}
          <RadioGroup
            row 
            name="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <FormControlLabel 
              value="weekly" 
              control={<Radio required />} 
              label="Weekly" 
            />
            <FormControlLabel 
              value="monthly" 
              control={<Radio />} 
              label="Monthly" 
            />
          </RadioGroup>

        </FormControl>

        <Button
          type="submit"
          variant="outlined"
        >
          Create Budget
        </Button>

      </FormControl>

    <div>{message}</div>

    </form>
  );

};

export default CreateBudget;
