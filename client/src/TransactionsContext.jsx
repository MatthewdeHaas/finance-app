import { createContext, useContext, useState, useEffect } from "react";


const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchTransactions = async () => {
 
    fetch(`${process.env.REACT_APP_API_URL}/api/transaction`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ num: null })
    }).then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
    .catch(err => {
        console.error("Error fetching transactions");
        setLoading(false);
      });

  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (data) => {

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/account/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(data)
      });


     await fetchTransactions(); 

      console.log("Updated account balance!");
    } catch (err) {
      console.error("Error updating account balance", err);
    }
  }

  return ( 
    <TransactionsContext.Provider value={{transactions, loading, fetchTransactions, addTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );

}

// Custom hook for convenience
export function useTransactions() {
  return useContext(TransactionsContext);
}
