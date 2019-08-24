# Balance
Balance is a budget planning app. The intent is to allow users the ability to add their monthly income, expenses, and view their balance remainder.

## Table of Contents
1. [Requirements](https://github.com/joekennerly/Balance#requirements)
1. [Setup](https://github.com/joekennerly/Balance#setup)
1. [Getting Started](https://github.com/joekennerly/Balance#getting-started)
1. [Development Libraries and Tools](https://github.com/joekennerly/Balance#development-libraries-and-tools)

## Requirements
1. [Install npm](https://www.npmjs.com/get-npm)
2. [Install json-server](https://www.npmjs.com/package/json-server)

## Setup
1. Clone the Repo
1. Run `npm install` in the root directory of application
1. Goto  `api/` from root directory in application
1. Create db file `database.json`
1. Run `json-server -p 5002 -w database.json`
1. Open another terminal and run `npm start` in project folder

## Copy this into your own file
### database.json
```
{
  "users":[],
  "categories":[],
  "income":[],
  "expenses":[]
}
```

## Getting Started
1. Register a new user
2. Login with existing user

## Development Libraries and Tools
* React js
* Semantic UI
* Moment js
* Chart js


--------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
