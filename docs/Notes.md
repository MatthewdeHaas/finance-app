# Notes


## Auth
  - Right now endpoints themselves aren't authenticated, just the page loads
  - In the future it would be nice to fix this, but as it stands auth is working well


## Bugs
  - Not Refreshing the browser and hitting "/" takes you to the login page. After a single refresh, it works as usual


## TODO
  - [x] Ensue refresh tokens are only minted if they don't already exist for a given user on login  
  - [ ] Implement create account form so getting the accounts can be properly tested 
  - [ ] Front end is fetching accounts on mount (I think), but not returning the correct value. Fix
  - [ ] Implement account creation and expense recording as components
  - [ ] Handle duplicate names on registration

