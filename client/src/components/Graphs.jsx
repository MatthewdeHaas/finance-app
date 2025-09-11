import { useState, useEffect } from 'react';
import PieChart from './PieChart'
import BarGraph from './BarGraph'


const Graphs = () => {

  
  return (

    <div className="flex flex-row justify-between space-x-6">
      <div className="flex-1">
        <p>Expenses By Category</p>
        <PieChart />
      </div>
      <div className="flex-1">
        <p>Expenses With Budgets</p>
        <BarGraph />
      </div>
    </div>

  )

};


export default Graphs; 
