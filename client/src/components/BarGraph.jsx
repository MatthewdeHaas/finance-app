import { useState, useEffect } from 'react';


 // TODO:
  // - Get expenses/wtihdrawals organzied by category
  // - Get budgets per category
  // - x-axis: categories
  // - y-axis: total withdrawals
  // Annotate each bar/category with the threshold of the budget it belongs to

const BarGraph = () => {
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetch("http://localhost:5001/api/category", { 
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    })
    .then(res => res.json())
    .then(data => {
        setCategories(data);
        setLoading(false);
      })
    .catch(err => {
        console.log("Error fetching categories")
      });

    fetch("http://localhost:5001/api/budget", { 
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    })
    .then(res => res.json())
    .then(data => {
        setBudgets(data);
        setLoading(false);
      })
    .catch(err => {
        console.log("Error fetching budgets")
      });

  }, []);    

  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  return (
    <></>
  )

};

export default BarGraph;
