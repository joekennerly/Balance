# Balance
Balance is a budget planning app. The intent is to allow users the ability to add their monthly income, expenses, and view their balance remainder.

## Table of Contents
*
*
*
*

## Requirements
1. [Install npm](https://www.npmjs.com/get-npm)
2. [Install json-server](https://www.npmjs.com/package/json-server)

## Setup
1. Clone the Repo
1. Run `npm install` in the root directory of application
2. Goto  `api/` from root directory in application
3. Create db file `database.json`
4. Run `json-server -p 5002 -w database.json`
5. Open another terminal and run `npm start` in project folder

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
1. Login with existing user

## Development Libraries and Tools
* React js
* Semantic UI
* Moment js
* Chart js


--------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
