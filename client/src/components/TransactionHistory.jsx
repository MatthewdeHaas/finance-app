import { useState, useEffect } from 'react';
import { useTransactions } from '../TransactionsContext';


const TransactionHistory = (props) => {
  var { transactions, loading } = useTransactions();
  
  if (loading) return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>;

  if (transactions.length === 0) return <p>No Transactions made</p>;

  if (props.num_transactions) transactions = transactions.slice(0, props.num_transactions)

  return (
  
    <div>
      {
        transactions.map((acc, i) => (
          <div
            key={i}
            className="p-3 border-b border-neutral-300 grid grid-cols-[1fr_auto] gap-y-1 gap-x-4"
          >
            {/* Account */}
            <p className="font-bold break-words">Account:</p>
            <p>{acc.account_name}</p>

            {/* Category */}
            <p className="font-bold break-words">Category:</p>
            <p>{acc.category_name || "None"}</p>

            {/* Amount */}
            <p className="font-bold break-words">{acc.transaction_type}:</p>
            <p
              className={
                acc.transaction_type === "Deposit"
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(acc.amount)}
            </p>

            {/* Date (span full width) */}
            <p className="col-span-2 text-sm text-neutral-600">
              {new Date(acc.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          )
        )
      }
    </div>

  )

};

export default TransactionHistory;
