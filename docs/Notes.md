# Notes


## Auth
  - Right now endpoints themselves aren't authenticated, just the page loads
  - In the future it would be nice to fix this, but as it stands auth is working well


## Bugs
  - Not Refreshing the browser and hitting "/" takes you to the login page. After a single refresh, it works as usual


## TODO
  - [x] Add a category input field to withdraw/deposit
  - [ ] Transactions:
    - [ ] Record and test in database 
    - [ ] Display on the screen beside accounts
    - [ ] Allow accounts to be clicked and transactions to be filtered by them
  - [ ] Allow the accounts list in the transactions page to listen for new accounts/updated balances
