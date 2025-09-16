import { useState } from 'react';
import { useAccounts } from '../AccountsContext';

const AccountList = () => {
  // const { accounts } = useAccounts();
  const { accounts, loading } = useAccounts();


  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  if (accounts.length === 0) return <p>No Accounts Created</p>;

  return (
    <>
      {accounts.map((acc, i) => (
        <div key={i} 
            className="p-3 border-b border-neutral-300 grid grid-cols-[1fr_auto] gap-y-1 gap-x-4"
>
          <p className="font-bold">{acc.name}</p>
          <span className="flex flex-row space-x-2">
            <p>Balance: </p>
            <p
              className={`${
                parseInt(acc.balance, 10) > 0
                  ? "text-green-500"
                  : parseInt(acc.balance, 10) < 0
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              ${acc.balance}
            </p>
          </span>
        </div>
      ))} 
    </>     
  );

};


export default AccountList;
