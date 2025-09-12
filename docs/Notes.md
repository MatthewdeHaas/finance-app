# Notes


## Auth
  - Right now endpoints themselves aren't authenticated, just the page loads
  - In the future it would be nice to fix this, but as it stands auth is working well


## Bugs
  - Not Refreshing the browser and hitting "/" takes you to the login page. After a single refresh, it works as usual


## TODO

### Now:
- [ ] Dashboard:
  - [x] High level overview:
    - [x] Net balance (sum of all accounts)
    - [x] Total spent this week/month 
    - [x] Budget summary (1/5 budgets are overspending)
  - [x] Five most recent transactions
  - [ ] Trend line for spending per day over the month
  - [ ] List categories with budgets

### Later:
- [ ] Normalized 'accounts' table
  - [ ] Remove 'balance' column from the 'accounts' table
  - [ ] Adjusted queries that use balance so that it instead sums transactions with the associated account id
- [ ] Filter graphs by month
- [ ] Allow accounts to be clicked and transactions to be filtered by them
- [ ] Allow the accounts list in the transactions page to listen for new accounts/updated balances
