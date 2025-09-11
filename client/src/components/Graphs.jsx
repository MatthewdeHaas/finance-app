import { useState, useEffect } from 'react';
import PieChart from './PieChart'
import BarGraph from './BarGraph'


const Graphs = () => {

  
  return (

    <div className="flex flex-row space-x-6">
      <div>
        <p>Expenses by category</p>
        <PieChart />
      </div>
      <div>
        <BarGraph />
      </div>
    </div>

  )

};


export default Graphs; 
