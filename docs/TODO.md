# TODO


## Auth
  - Right now endpoints themselves aren't authenticated, just the page loads
  - In the future it would be nice to fix this, but as it stands auth is working well


## Bugs


## TODO

### Now:
- [ ] Add Context new
  - [x] Accounts
  - [ ] Transactions
  - [ ] 
- [ ] Success message on form submissions
  - [ ] Accounts
  - [ ] Category
  - [ ] Deposit/Withdrawal
  - [ ] Budget

### Later:
- [ ] Smart insights:
  - [ ] Tell users when they are on on track to overspending
- [ ] Budgets
  - [ ] Monthly spending by account
- [ ] Normalized 'accounts' table
  - [ ] Remove 'balance' column from the 'accounts' table
  - [ ] Adjusted queries that use balance so that it instead sums transactions with the associated account id
- [ ] Filter graphs by month
- [ ] Allow accounts to be clicked and transactions to be filtered by them
