import { useState, useEffect } from 'react';

const Overview = () => {
  const [netBalance, setNetBalance] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [budgetsPastThreshold, setBudgetsPastThreshold] = useState([]);
   

  useEffect(() => {
   
    fetch(`${process.env.REACT_APP_API_URL}/api/account/net-balance`, {
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

    fetch(`${process.env.REACT_APP_API_URL}/api/transaction/monthly-spending`, {
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

    fetch(`${process.env.REACT_APP_API_URL}/api/budget/past-threshold-num`, {
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

    <div className="flex flex-col divide-y divide-neutral-500">
      {/* Net Balance */}
      <div className="grid grid-cols-[1fr_auto] items-center py-1 gap-2">
        <p className="font-bold break-words">Net balance:</p>
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(netBalance.amount)}
        </p>
      </div>

      {/* Monthly Spending */}
      <div className="grid grid-cols-[1fr_auto] items-center py-1 gap-2">
        <p className="font-bold break-words">
          Spent this{" "}
          {new Date().toLocaleString("en-US", { month: "long" })}:
        </p>
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(monthlySpending.amount)}
        </p>
      </div>

      {/* Budgets over limit */}
      <div className="grid grid-cols-[1fr_auto] items-center py-1 gap-2">
        <p className="font-bold break-words">Budgets past threshold:</p>
        <p>
          {budgetsPastThreshold.num_past_threshold}/
          {budgetsPastThreshold.total_budgets_num}
        </p>
      </div>
    </div>

  )

};

export default Overview;
