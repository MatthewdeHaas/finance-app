import { useState } from 'react';
import { FormControl, TextField, Button} from '@mui/material';


const CreateCategory = () => {
  const [category, setCategory] = useState("");

  const create = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/category/create", {
      method: "POST",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: category })
    });

  };

  return (
    <form autoComplete="off" className="flex flex-col space-y-6" onSubmit={create}>

      <FormControl>

        <TextField
          type="text"
          placeholder="e.g. grocerices, recreaction" 
          required
          value={category}
          autoComplete="off"
          onChange={(e) => setCategory(e.target.value)}
          >
        </TextField> 

        <Button
          type="submit"
          variant="outlined"
        >
          Create Category
        </Button>

      </FormControl> 

    </form>
  );

};

export default CreateCategory;
