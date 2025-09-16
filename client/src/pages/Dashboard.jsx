import Overview from '../components/Overview';
import TransactionHistory from '../components/TransactionHistory';
import TrendLine from '../components/TrendLine';
import BudgetSummary from '../components/BudgetSummary.jsx';


const Dashboard = () => {


return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center py-6">Dashboard</h1>

      {/* Main Grid Layout */}
      <div className="flex flex-row px-12 space-x-6">
        
        {/* Left column: Overview + Budget Summary */}
        <div className="flex flex-col space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <Overview />
          </div>

          {/* Budget Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
            <BudgetSummary />
          </div>

          {/* Middle column: Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionHistory num_transactions={3} />
          </div>

        </div>

        {/* Right column: Trendline */}
        <div className="bg-white grow rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Spending</h2>
          <TrendLine
            startDate={`${new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            ).toISOString()}`}
          />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
