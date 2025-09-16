# TODO



## TODO

### Now:
- [x] Fix auth in prod
- [ ] Improve look:
  - [x] Dashboard
  - [x] Budgets
  - [ ] Accounts
- [ ] Weekly/monthly budgets
  - [ ] Create 'Current week' and 'Current month' toggle
  - [ ] The buttons should only sum from the current week/month - change query for bar graph data
  - Note: The budgets/thresholds shouldn't have to change because the sum is what changes, not the period (since the budgets repeat)
  - Note: Will still have to reference the budgets creation date to determine when to sum to in the transactions history 


### Later:
- [ ] Normalized 'accounts' table
  - [ ] Remove 'balance' column from the 'accounts' table
  - [ ] Adjusted queries that use balance so that it instead sums transactions with the associated account id
