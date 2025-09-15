import { useState } from 'react';
import { useAccounts } from '../AccountsContext';
import { FormControl, TextField, Button} from '@mui/material';


const OpenAccount = () => {
  const [accountName, setAccountName] = useState("");
  const [message, setMessage] = useState("");
  
  const { addAccount } = useAccounts();

  const create = async (e) => { 
    e.preventDefault();

    addAccount(accountName);

    setAccountName("");
    setMessage("Account Opened!")
  }

  return (

      <form autoComplete="off" className="flex flex-col space-y-6" onSubmit={create}>

        <FormControl>

          <TextField
            type="text"
            placeholder="e.g. chequing" 
            required
            value={accountName}
            autoComplete="off"
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

        <div>{message}</div>

      </form>

  );  
  
};


export default OpenAccount;
