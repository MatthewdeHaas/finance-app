import Overview from '../components/Overview';
import TransactionHistory from '../components/TransactionHistory';
import TrendLine from '../components/TrendLine';
import BudgetSummary from '../components/BudgetSummary.jsx';


const Dashboard = () => {
 
return (
    <div className="flex flex-col h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center py-6">Dashboard</h1>

      {/* main row constrained to remaining viewport height */}
      <div className="flex flex-1 overflow-hidden px-12 space-x-6">
        {/* LEFT: scrollable stack */}
        <aside className="w-1/3 flex flex-col gap-6 overflow-y-auto min-h-0 pr-2">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <Overview />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
            <BudgetSummary />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionHistory num_transactions={3} />
          </div>
        </aside>

        {/* RIGHT: chart column. note flex settings */}
        <main className="flex-1 flex flex-col min-h-0 h-fit">
          <div className="bg-white rounded-2xl shadow-md p-6 flex-1 min-h-0">
            <h2 className="text-xl font-semibold mb-4">Monthly Spending</h2>

            {/* chart wrapper fills the remaining space of the card */}
            <div className="h-full min-h-0">
              <TrendLine
                startDate={`${new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  1
                ).toISOString()}`}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};


export default Dashboard;
