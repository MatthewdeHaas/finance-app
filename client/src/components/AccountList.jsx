import { useState, useEffect } from 'react';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost:5001/api/account", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    }).then(res => res.json())
      .then(data => {
        setAccounts(data);
        setLoading(false);
      })
    .catch(err => {
        console.error("Error fetching accounts");
        setLoading(false);
      });

  }, []); // '[]' means this only runs when the component mounts 

  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  if (accounts.length === 0) return <p>No Accounts Created</p>;

  return (
    <>
      {accounts.map((acc, i) => (
        <div key={i} className="p-2 border-2 border-neutral-500 rounded-md">
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
