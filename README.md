# Balance
## Requirements
1. Install npm
2. Install json-server

## Setup
1. Clone the Repo
1. Run `npm install` in the root directory of application
1. Make and goto `api/` from root directory in application
1. Touch `database.json` and paste in the file below
1. (Inside api folder) Run `json-server -p 5002 -w database.json`
1. Open another terminal and run `npm start`

### `database.json`
```
{
  "users": [
    {
      "name": "joe",
      "password": "joe",
      "id": 1
    },
    {
      "name": "1",
      "password": "1",
      "id": 3
    },
    {
      "name": "jim",
      "password": "jim",
      "id": 2
    }
  ],
  "categories": [
    {
      "name": "food",
      "user_Id": 1,
      "budget": 400,
      "id": 1
    },
    {
      "name": "utilities",
      "user_Id": 1,
      "budget": 400,
      "id": 2
    }
  ],
  "income": [
    {
      "name": "pizzahut",
      "date": "2019-07-01",
      "amount": 100.21,
      "user_id": 1,
      "reoccuring": true,
      "id": 1
    },
    {
      "name": "pizzahut",
      "date": "2019-07-01",
      "amount": 100.21,
      "user_id": 1,
      "reoccuring": true,
      "id": 2
    },
    {
      "name": "pizzahut",
      "date": "2019-07-01",
      "amount": 100.21,
      "user_id": 1,
      "reoccuring": true,
      "id": 3
    }
  ],
  "expenses": [
    {
      "date": "2019-07-01",
      "category_id": 1,
      "name": "taco",
      "amount": 5,
      "id": 1
    },
    {
      "date": "2019-07-01",
      "category_id": 1,
      "name": "taco",
      "amount": 5,
      "id": 2
    },
    {
      "date": "2019-07-01",
      "category_id": 1,
      "name": "taco",
      "amount": 5,
      "id": 3
    },
    {
      "date": "2019-07-01",
      "category_id": 1,
      "name": "taco",
      "amount": 5,
      "id": 4
    },
    {
      "date": "2019-07-28",
      "category": "Food",
      "name": "Taco",
      "amount": "5.00",
      "id": 5
    },
    {
      "date": "2019-07-28",
      "category": "food",
      "name": "taco",
      "amount": "5",
      "id": 6
    }
  ]
}
```

--------------

## REACT INFO

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
