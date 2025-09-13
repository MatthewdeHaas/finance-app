import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const TrendLine = (props) => {
  const [transactions, setTransactions] = useState([]); 

  // Initialize the chart
  const [chart, setChart] = useState({
      series: [],
      options: {
        chart: {
          width: '100%',
          height: '75%',
          type: 'area',
        },
        labels: [],
      },
  });  

  // Wait for the transactions hook to change
  useEffect(() => {
    if (transactions.length > 0) {
      setChart({

        series: [{
          name: 'series2',
          data: transactions.map((t) => Number(t.day_amount) || 0)
        }],
        options: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: transactions.map((t) => t.day)
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        },

      })

    }
  }, [transactions]);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/api/transaction/daily-volume`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ startDate: props.startDate })
    }).then(res => res.json())
      .then(data => {
        setTransactions(data);
      })
    .catch(err => {
        console.error("Error fetching daily amount");
      });

  }, [])



  return (
    <Chart 
      options={chart.options}
      series={chart.series}
      type="area"
      height={640}
    />
  )

};

export default TrendLine;
