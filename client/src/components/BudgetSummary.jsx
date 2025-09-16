import { useState, useEffect } from 'react';

const BudgetSummary = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/api/category/aggregate`, { 
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

        <div className="grid grid-cols-[1fr_auto] items-center border-b border-neutral-500 py-1 gap-2">
          {/* Label (can wrap, takes full space) */}
          <p className="font-bold break-words">
            {`${acc.category_name} - ${
              acc.period
                ? acc.period.charAt(0).toUpperCase() + acc.period.slice(1)
                : "No budget"
            }:`}
          </p>

          {/* Numbers (stay aligned right, don't move if label wraps) */}
          <div className="flex items-center space-x-1 justify-end">
            <p
              className={`${
                Number(acc.threshold) > 0 && Number(acc.volume) > Number(acc.threshold)
                  ? "text-red-500"
                  : ""
              }`}
            >
              ${acc.volume}
            </p>
            {acc.threshold && <p className="text-gray-600">/ ${acc.threshold}</p>}
          </div>
        </div>

      ))}
    </>
  )

};

export default BudgetSummary;
