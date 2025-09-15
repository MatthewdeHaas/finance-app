import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css";
import { AccountsProvider } from './AccountsContext'
import { TransactionsProvider } from './TransactionsContext'

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(`\nAPI URL: ${ process.env.REACT_APP_API_URL }\n`)
root.render(
  <AccountsProvider>
    <TransactionsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TransactionsProvider>
  </AccountsProvider>
);
