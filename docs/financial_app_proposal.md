# Financial Web App

## What I Want
- A way to track expenses as they are made
- A way to project expenses/budget


## Contents
- ### Accounts and Transactions:
  - Create chequing/savings accounts
  - Individual or recurring transactions (amount, date, category, account)
- ### Budget:
  - Tracker per category (graph/progress bar)
  - Monthly cap per category
- ## Login
  - Create accounts
  - Encrypt passwords in database and add auth middleware with a jwt token



## Pages
- Landing page: login/Create account
- Dashboard: high level overview
- Transactions: create a different accounts and transactions
- Budget Tracker: expenses by categories and set limits

## Tables
- users:
  - pk
  - username
  - password

- accounts:
  - pk
  - user_id # foreign key with users id (refers to primary key in users table)
  - Title

- transactions:
  - pk
  - user_id # foreign key with users
  - account_id # foreign key with accounts
  - category_id # foreign key with categories
  - amount
  - date

- categories:
  - pk
  - user_id # foreign key with users
  - name

- budgets:
  - pk
  - user_id # foreign key with users
  - category_id # foreign key with category
  - limit
  - period

