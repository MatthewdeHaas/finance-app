import { useState } from 'react';
import { useEffect } from 'react';

const Accounts = () => {
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

  return (
    
    <div className="flex flex-col space-y-6">
      <p className={`${ accounts.length === 0 ? "" : "hidden" }`}>No Accounts</p>      

      {accounts.map((acc, i) => (
        <div key={i} className="p-2 border-2 border-neutral-500 rounded-md">
          <p className="font-bold">{acc.name}</p>
          <span>Balance: {acc.balance}</span>
        </div>
      ))} 

    </div>

  )

};


export default Accounts;
