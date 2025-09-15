import { createContext, useContext, useState, useEffect } from "react";

const AccountsContext = createContext();

export function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch accounts from API
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/account`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error("Error fetching accounts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);



  const addAccount = async (accountName) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/account/create`, {
      method: "POST",
      credentials: "include", 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: accountName })
    });

    if (!res.ok) throw new Error("Failed to add account");
    const newAccount = await res.json();

    console.log(`\n${ JSON.stringify(newAccount) }\n`)

    setAccounts((prev) => [...prev, newAccount[0]]);
    setLoading(false);
  };

  return (
    <AccountsContext.Provider value={{ accounts, loading, fetchAccounts, addAccount }}>
      {children}
    </AccountsContext.Provider>
  );


}

// Custom hook for convenience
export function useAccounts() {
  return useContext(AccountsContext);
}
