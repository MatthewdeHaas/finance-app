import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';


// TODO:
// - Get expenses/withdrawals by category
// - Graph categories on the pie chart by category


const PieChart = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [chartData] = useState({

          series: [
      {
        name: "Balance",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148], // your data here
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Account Balance Over Time",
        align: "center",
      },
    },


  });

  useEffect(() => {

    fetch("http://localhost:5001/api/category", { 
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    })
    .then(res => res.json())
    .then(data => {
        setCategories(data);
      })
    .catch(err => {
        console.log("Error fetching categories")
      });

  }, []);    



  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  return (
    <Chart 
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={350}
    />
  )

};

export default PieChart;
