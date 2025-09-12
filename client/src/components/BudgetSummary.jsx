import { useState, useEffect } from 'react';

const BudgetSummary = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5001/api/category/aggregate", { 
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ type: 'Withdrawal' })
    })
    .then(res => res.json())
    .then(data => {
        setCategories(data);
      })
    .catch(err => {
        console.log("Error fetching transactions")
      });

  }, [])

  return (
    <>
      {categories.map((acc, i) => (
        <span className="flex flex-row space-x-2">
        <p className="font-bold">
          {`${acc.category_name} - ${
            acc.period ? acc.period.charAt(0).toUpperCase() + acc.period.slice(1) : "No budget"
          }: `}
        </p>
          <p className={` ${ (Number(acc.threshold) > 0 && Number(acc.volume) > Number(acc.threshold)) ? 'text-red-500' : ''}`}> 
            ${acc.volume} 
          </p>
          <p className={`${ acc.threshold ? '' : 'hidden' }`}> 
            / ${acc.threshold}
          </p>
        </span>
      ))}
    </>
  )

};

export default BudgetSummary;
