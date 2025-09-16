import OpenAccount from '../components/OpenAccount'
import CreateCategory from '../components/CreateCategory'
import UpdateBalance from '../components/UpdateBalance'
import AccountList from '../components/AccountList'
import TransactionHistory from '../components/TransactionHistory'

const Accounts = () => {

  return (
    <div className="flex flex-col h-screen p-6">
      {/* Page title */}
      <h1 className="text-4xl font-semibold text-center mb-6">Accounts</h1>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* LEFT: Forms */}
        <div className="w-1/3 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Open a New Account</h2>
            <OpenAccount />
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Create a Category</h2>
            <CreateCategory />
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Make Deposit / Withdrawal</h2>
            <UpdateBalance />
          </div>
        </div>

        {/* RIGHT: Lists */}
        <div className="w-2/3 flex flex-row gap-6">

          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Accounts</h2>
            <div className="flex-1 overflow-y-auto">
              <AccountList />
            </div>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            <div className="flex-1 overflow-y-auto">
              <TransactionHistory num_transactions={null} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Accounts;
