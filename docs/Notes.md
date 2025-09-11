# Notes


## Auth
  - Right now endpoints themselves aren't authenticated, just the page loads
  - In the future it would be nice to fix this, but as it stands auth is working well


## Bugs
  - Not Refreshing the browser and hitting "/" takes you to the login page. After a single refresh, it works as usual


## TODO

### Now:
  - [x] Add a category input field to withdraw/deposit
  - [x] Transactions:
    - [x] Record and test in database 
    - [x] Display on the screen beside accounts
  - [x] Pie chart for total expenses by category
  - [ ] Horizontal bar graph for expenses by categories with annotated by budget threshold per category

### Later:
- [ ] Allow accounts to be clicked and transactions to be filtered by them
- [ ] Allow the accounts list in the transactions page to listen for new accounts/updated balances
