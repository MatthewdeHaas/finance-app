import { useState } from 'react';
import Accounts from '../components/Accounts'

const Transactions = () => {


  const [accountName, setAccountName] = useState("");
  const [accountList, setAccountList] = useState(null);

  const createAccount = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/account/create", {
      method: "POST",
      credentials: "include", 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: accountName })
    }
    );

  }

  return (
    <div className="flex flex-row justify-between px-24">

      {/* Create Account */}
      <form className="flex flex-col p-12 space-y-6" onSubmit={createAccount}>
        Create new account
        
        <input className="border-2 border-blue-500 rounded-md p-2"
               type="text"
               placeholder="e.g. chequing" 
               value={accountName}
               onChange={(e) => setAccountName(e.target.value)}
        />
        <button type="submit" className="border-2 border-blue-500 rounded-md p-2">Open Account</button>
      
      </form>

     {/* Record Expense  */}
      <form className="flex flex-col p-12 space-y-6">
        Record Expense 
      </form>

      {/* Account list */}
      <div className="flex flex-col p-12 space-y-6">
        <p>Accounts</p>
         <Accounts /> 
      </div>  

    </div>
  );
};


export default Transactions;
