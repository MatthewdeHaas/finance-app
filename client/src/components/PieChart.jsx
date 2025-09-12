import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';


const PieChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize the chart
  const [chart, setChart] = useState({
      series: [],
      options: {
        chart: {
          width: '100%',
          height: '75%',
          type: 'pie',
        },
        labels: [],
      },
  });

  // Get transactions
  useEffect(() => {

    fetch("http://localhost:5001/api/category/aggregate", { 
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ type: 'Withdrawal' })
    })
    .then(res => res.json())
    .then(data => {
        setTransactions(data);
      })
    .catch(err => {
        console.log("Error fetching transactions")
      });

  }, []);    

// Wait for the transactions hook to change
useEffect(() => {
  if (transactions.length > 0) {
    setChart({
      series: transactions.map((t) => Number(t.volume) || 0),
      options: {
          labels: transactions.map((t) => String(t.category_name + " - " + (t.period ? t.period.charAt(0).toUpperCase() + t.period.slice(1) : "No budget"))),
          chart: {
            width: '100%',
            height: '75%',
          }
      },
    });
  }
}, [transactions]);


  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  return (
    <Chart 
      options={chart.options}
      series={chart.series}
      type="pie"
      height={640}
    />
  )

};

export default PieChart;
