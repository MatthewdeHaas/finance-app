import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';


const BarGraph = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize the chart
  const [chart, setChart] = useState({
      series: [],
      options: {
        chart: {
          width: '100%',
          height: '75%',
          type: 'bar',
        },
        labels: [],
      },
  });

  // Wait for the transactions hook to change
  useEffect(() => {
    if (categories.length > 0) {
      setChart({
        series: [
          {
            name: 'Category',

            data: categories.map((t) => ({
              x: String(t.category_name),
              y: Number(t.volume) || 0,
              goals: [
                {
                  name: 'Threshold',
                  value: t.threshold,   
                  strokeWidth: 2,
                  strokeColor: '#775DD0'
                }
              ]
            }))
    
          }
        ],
        options: {
          chart: {
            width: '100%',
            height: '75%',
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          }
        }
      });
    }
  }, [categories]);

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


  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  return (
    <Chart 
      options={chart.options}
      series={chart.series}
      type="bar"
      height={640}
    />
  )

};

export default BarGraph;
