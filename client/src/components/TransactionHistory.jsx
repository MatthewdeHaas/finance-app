import { useState, useEffect } from 'react';


const TransactionHistory = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetch("http://localhost:5001/api/transaction", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ num: props.num_transactions })
    }).then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
    .catch(err => {
        console.error("Error fetching transactions");
        setLoading(false);
      });

  }, [])
  
  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  if (transactions.length === 0) return <p>No Transactions made</p>;

  return (
  
    <>
      {
        transactions.map((acc, i) => (
          <div key={i} className="p-2 border-2 border-neutral-500 rounded-md">
            <span className="flex flex-row space-x-2">
              <p className="font-bold">Account: </p>
              <p>{acc.account_name}</p>
            </span>
            <span className="flex flex-row space-x-2">
              <p className="font-bold">Category: </p>
              <p>{!acc.category_name ? "None" : acc.category_name}</p>
            </span>
            <span className="flex flex-row space-x-2">
              <p>{acc.transaction_type}: </p>
              <p className={`${ acc.transaction_type === "Deposit" ? "text-green-500" : "text-red-500"}`}>
              <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(acc.amount)}</p>
              </p>
            </span>
            <p>{`${new Date(acc.date).toLocaleDateString("en-US", {
                  year: "numeric", 
                  month: "long", 
                  day: "numeric"})
            }`}
            </p>
          </div>
          )
        )
      }
    </>

  )

};

export default TransactionHistory;
