import { useState, useEffect } from 'react';

const Overview = () => {
  const [netBalance, setNetBalance] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [budgetsPastThreshold, setBudgetsPastThreshold] = useState([]);
   

  useEffect(() => {
   
    fetch("http://localhost:5001/api/account/net-balance", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    }).then(res => res.json())
      .then(data => {
        setNetBalance(data);
      })
    .catch(err => {
        console.error("Error fetching net balance");
      });

    fetch("http://localhost:5001/api/transaction/monthly-spending", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    }).then(res => res.json())
      .then(data => {
        setMonthlySpending(data);
      })
    .catch(err => {
        console.error("Error fetching monthly spending");
      });

    fetch("http://localhost:5001/api/budget/past-threshold-num", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    }).then(res => res.json())
      .then(data => {
        setBudgetsPastThreshold(data);
      })
    .catch(err => {
        console.error("Error fetching budgets past threshold number");
      });
    
  }, [])


  return (

    <div className="flex flex-col">

      {/* Net Balance */}
      <span className="flex flex-row space-x-2">
        <p className="font-bold">Net balance:</p>
        <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(netBalance.amount)}</p>
      </span>

      {/* Monthly Spending */}
      <span className="flex flex-row space-x-2">
        <p className="font-bold">Spent this {new Date().toLocaleString('en-US', { month: 'long' })}:</p>
        <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlySpending.amount)}</p>
      </span>

      {/* Budgets over limit */}
      <span className="flex flex-row space-x-2">
        <p className="font-bold">Budgets past threshold:</p>
        <p> {budgetsPastThreshold.num_past_threshold}/{budgetsPastThreshold.total_budgets_num}</p>
      </span>


    </div>

  )

};

export default Overview;
