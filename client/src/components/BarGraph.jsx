import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';


const BarGraph = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("monthly")

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

    console.log("HERE", period)

    fetch(`${process.env.REACT_APP_API_URL}/api/category/aggregate`, { 
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ 
        type: 'Withdrawal',  
        period: period
      })
    })
    .then(res => res.json())
    .then(data => {
        setCategories(data);
      })
    .catch(err => {
        console.log("Error fetching transactions")
      });

  }, [period])


  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  return (
    <div className="flex flex-col space-y-6">
      <Chart 
        options={chart.options}
        series={chart.series}
        type="bar"
        height={640}
      />
      <div className="flex flex-row space-x-4">
          <RadioGroup
            row 
            name="period-radio-group"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
            <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
          </RadioGroup>
      </div>
    </div>
  )

};

export default BarGraph;
