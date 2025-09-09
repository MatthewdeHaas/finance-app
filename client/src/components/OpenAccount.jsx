import { useState } from 'react';
import { FormControl, TextField, Button} from '@mui/material';


const OpenAccount = () => {

  const [accountName, setAccountName] = useState("");
  
  const create = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/account/create", {
      method: "POST",
      credentials: "include", 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: accountName })
    });

  }

  return (

      <form autoComplete="off" className="flex flex-col space-y-6" onSubmit={create}>

        <FormControl>

          <TextField
            type="text"
            placeholder="e.g. chequing" 
            required
            value={accountName}
            autocomplete="off"
            onChange={(e) => setAccountName(e.target.value)}
            >
          </TextField> 

          <Button
            type="submit"
            variant="outlined"
          >
            Open Account
          </Button>

        </FormControl> 

      </form>

  );  
  
};


export default OpenAccount;
