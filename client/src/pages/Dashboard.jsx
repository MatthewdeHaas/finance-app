import Overview from '../components/Overview';
import TransactionHistory from '../components/TransactionHistory';
import TrendLine from '../components/TrendLine';
import BudgetSummary from '../components/BudgetSummary.jsx';



const Dashboard = () => {
  return (
    <div className="flex flex-col text-center">

      <p className="text-4xl font-semi-bold p-2">
        Dashboard
      </p>

      <div className="flex flex-row justify-between px-24">

        {/* High Level Overview */}
        <div className="flex flex-col px-12 py-4 space-y-6">
          <p>Overview</p>
          <Overview />
        </div>

        {/* Recent Transactions */}
        <div className="flex flex-col px-12 py-4 space-y-6">
          <p>Recent Transactions</p>
          <TransactionHistory num_transactions={5} />
        </div>

        {/* Categogires With Budgets */}
        <div className="flex flex-col px-12 py-4 space-y-6">
          <p>Budget Summary</p>
          <BudgetSummary />
        </div>
        {/* Exepnse Trendline */}

        <div className="flex flex-col grow px-12 py-4 space-y-6">
          <p>Monthly Spending</p>
          <TrendLine />
        </div>

      </div>


    </div>
  );
};


export default Dashboard;
