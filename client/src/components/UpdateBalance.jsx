import { useState, useEffect} from 'react'; 
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Radio, RadioGroup, Button} from '@mui/material';

const UpdateBalance = () => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState(""); // default value

  
  const updateAccount = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/account/update", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({
          account: selectedAccount,
          amount: amount,
          type: transactionType
        })
      });

      const data = await res.json();
      console.log("Updated account balance!");
    } catch (err) {
      console.error("Error updating account balance", err);
    }

  }

  useEffect(() => {

    fetch("http://localhost:5001/api/account", { 
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    })
    .then(res => res.json())
    .then(data => {
        setAccounts(data);
      })
    .catch(err => {
        console.log("Error fetching accounts")
      });

    fetch("http://localhost:5001/api/category", { 
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

  <form onSubmit={updateAccount}>

      <FormControl>

        <FormControl>

          {/* Account Dropdown */}
          <InputLabel id="account-select-label">Account</InputLabel>
          <Select
            labelId="account-select-label"
            id="account-select"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            label="Account"
            required
          >
            {accounts.map((acc, i) => (   
            <MenuItem key={acc.id} value={acc.name}>{acc.name}</MenuItem>
              )
            )}
          </Select>

        </FormControl>


        <FormControl>

          {/* Category */}
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
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


        <FormControl>

          {/* Deposit/Withdrawal Radio */}
          <RadioGroup
            row 
            name="account-type"
            required
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <FormControlLabel value="Withdrawal" control={<Radio />} label="Withdrawal" />
            <FormControlLabel value="Deposit" control={<Radio />} label="Deposit" />
          </RadioGroup>

        </FormControl>


        <FormControl>

          {/* Deposit/Withdraw amount */}
          <TextField
            label="Amount"
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
          <Button type="submit" variant="outlined">
            {transactionType || "Select Transaction Type"}
          </Button>


        </FormControl>
      </FormControl>    

    </form>

  );

};


export default UpdateBalance;




