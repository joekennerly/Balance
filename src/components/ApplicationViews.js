import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import APIManager from "../modules/APIManager"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"
import Expenses from "./expenses/Expenses"
import Income from "./income/Income"
import Register from "./login/Register"

let moment = require("moment")
let thisMonth = moment().format("YYYY-MM")

let colorArray = [
  "lightblue"
]
class ApplicationViews extends Component {
  state = {
    expenses: [],
    income: [],
    categories: [],
    chartData: {}
  }
  componentDidMount() {
    //Filtering by month on income and expenses
    let newState = {}
    APIManager.get(`expenses?user_id=${sessionStorage.getItem("activeUser")}`)
      .then(
        expenses =>
          (newState.expenses = expenses.filter(expense =>
            expense.date.startsWith(thisMonth)
          ))
      )
      .then(() =>
        APIManager.get(
          `income?user_id=${sessionStorage.getItem("activeUser")}`
        ).then(
          income =>
            (newState.income = income.filter(income =>
              income.date.startsWith(thisMonth)
            ))
        )
      )
      .then(() =>
        APIManager.get(
          `categories?user_id=${sessionStorage.getItem("activeUser")}`
        ).then(categories => {
          newState.categories = categories
          let currentDiff = [
            this.diff(this.sum(newState.income), this.sum(newState.expenses))
          ]
          newState.chartData = {
            labels: ["REMAINDER"].concat(this.makeArray(categories, "name")),
            datasets: [
              {
                data: currentDiff.concat(this.makeArray(categories, "amount")),
                backgroundColor: colorArray
              }
            ]
          }
        })
      )
      .then(() => this.setState(newState))
  }
  makeArray = (arr, prop) => arr.map(el => el[prop])
  sum = entryArray => {
    let total = 0
    entryArray.forEach(entry => (total += +entry.amount))
    return total.toFixed(2)
  }
  diff = (inTotal, exTotal) => (inTotal - exTotal).toFixed(2)
  isAuthenticated = () => sessionStorage.getItem("activeUser")
  deleteItem = (resource, id) => {
    let newObj = {}
    return APIManager.delete(resource, id)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => items.filter(arr => arr.date.startsWith(thisMonth)))
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  updateItem = (resource, id, editedObject) => {
    let newObj = {}
    return APIManager.put(resource, id, editedObject)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => items.filter(arr => arr.date.startsWith(thisMonth)))
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  addItem = (resource, item) => {
    let newObj = {}
    return APIManager.post(resource, item)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => items.filter(arr => arr.date.startsWith(thisMonth)))
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  deleteCat = (resource, id) => {
    let newObj = {}
    return APIManager.delete(resource, id)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  updateCat = (resource, id, editedObject) => {
    let newObj = {}
    return APIManager.put(resource, id, editedObject)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  addCat = (resource, item) => {
    let newObj = {}
    return APIManager.post(resource, item)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  updateChart = () => {
    let newState = {}
    let currentDiff = [
      this.diff(this.sum(this.state.income), this.sum(this.state.expenses))
    ]
    newState.chartData = {
      labels: ["REMAINDER"].concat(
        this.makeArray(this.state.categories, "name")
      ),
      datasets: [
        {
          data: currentDiff.concat(
            this.makeArray(this.state.categories, "amount")
          ),
          backgroundColor: colorArray
        }
      ]
    }
    this.setState(newState)
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Redirect to="/dashboard" />
          }}
        />
        <Route
          path="/register"
          render={props => {
            return <Register setUser={this.props.setUser} {...props} />
          }}
        />
        <Route
          path="/login"
          render={props => {
            if (!this.isAuthenticated()) {
              return <Login setUser={this.props.setUser} {...props} />
            } else return <Redirect to="/" />
          }}
        />
        <Route
          exact
          path="/dashboard"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Dashboard
                  activeUser={this.props.activeUser}
                  sum={this.sum}
                  diff={this.diff}
                  addItem={this.addCat}
                  deleteItem={this.deleteCat}
                  updateItem={this.updateCat}
                  income={this.state.income}
                  expenses={this.state.expenses}
                  categories={this.state.categories}
                  date={moment().format("YYYY-MM-DD")}
                  chartData={this.state.chartData}
                  updateChart={this.updateChart}
                  thisMonth={thisMonth}
                  {...props}
                />
              )
            } else return <Redirect to="/login" />
          }}
        />
        <Route
          exact
          path="/income"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Income
                  activeUser={this.props.activeUser}
                  sum={this.sum}
                  diff={this.diff}
                  addItem={this.addItem}
                  deleteItem={this.deleteItem}
                  updateItem={this.updateItem}
                  income={this.state.income}
                  expenses={this.state.expenses}
                  categories={this.state.categories}
                  date={moment().format("YYYY-MM-DD")}
                  thisMonth={thisMonth}
                  {...props}
                />
              )
            } else return <Redirect to="/login" />
          }}
        />
        <Route
          exact
          path="/expenses"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Expenses
                  activeUser={this.props.activeUser}
                  sum={this.sum}
                  diff={this.diff}
                  addItem={this.addItem}
                  deleteItem={this.deleteItem}
                  updateItem={this.updateItem}
                  income={this.state.income}
                  expenses={this.state.expenses}
                  categories={this.state.categories}
                  date={moment().format("YYYY-MM-DD")}
                  thisMonth={thisMonth}
                  {...props}
                />
              )
            } else return <Redirect to="/login" />
          }}
        />
        {/* dynamically route expense categories */}
        <Route
          path="/expenses/:categoryName"
          render={props => {
            if (this.isAuthenticated()) {
              let category = this.state.categories.find(
                category => category.name === props.match.params.categoryName
              )
              let filtered = this.state.expenses.filter(
                filtExpenses => filtExpenses.category_id === category.id
              )
              return (
                <Expenses
                  category={category}
                  expenses={filtered}
                  activeUser={this.props.activeUser}
                  sum={this.sum}
                  diff={this.diff}
                  addItem={this.addItem}
                  deleteItem={this.deleteItem}
                  updateItem={this.updateItem}
                  income={this.state.income}
                  categories={this.state.categories}
                  date={moment().format("YYYY-MM-DD")}
                  thisMonth={thisMonth}
                  {...props}
                />
              )
            }
          }}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)
