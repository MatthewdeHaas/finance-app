import { useState } from 'react';
import { FormControl, TextField, Button} from '@mui/material';


const CreateCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const create = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/category/create`, {
      method: "POST",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name })
    });
    setMessage(`${name} added as a new category`)

  };

  return (
    <form autoComplete="off" className="flex flex-col space-y-6" onSubmit={create}>

      <FormControl>

        {/* Name */}
        <TextField
          type="text"
          label="Name"
          placeholder="e.g. grocerices, recreaction" 
          required
          value={name}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          >
        </TextField> 

        <Button
          type="submit"
          variant="outlined"
        >
          Create Category
        </Button>

      </FormControl> 
  
      <div>{message}</div>

    </form>
  );

};

export default CreateCategory;
