import { useState } from 'react';
import OpenAccount from '../components/OpenAccount'
import CreateCategory from '../components/CreateCategory'
import UpdateBalance from '../components/UpdateBalance'
import Accounts from '../components/Accounts'

const Transactions = () => {

  return (
    
    <div className="flex flex-col text-center">

      <p className="text-4xl font-semi-bold p-2">
        Transactions
      </p>
      <div className="flex flex-row justify-between px-24">  


      {/* Open Account  */}
        <div className="flex flex-col px-12 py-4 space-y-6">
          <p>Open a New Account</p>
          <OpenAccount />  
        </div>

      {/* Create Category */}
        <div className="flex flex-col px-12 py-4 space-y-6">
          <p>Create Category</p>
          <CreateCategory />  
        </div>
    
      {/* Record Expense  */}
        <div className="flex flex-col px-12 py-4 space-y-6">
          <p>Make Deposit/Withdrawal</p>
          <UpdateBalance />  
        </div>

        {/* Account list */}
        <div className="flex flex-col px-12 py-4 space-y-6">
          <p>Accounts</p>
          <Accounts /> 
        </div>  

      </div>

    </div>

  );
};


export default Transactions;
