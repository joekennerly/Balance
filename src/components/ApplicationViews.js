import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import APIManager from "../modules/APIManager"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"

let moment = require("moment")
let thisMonth = moment().format("YYYY-MM")

let colorArray = [
  "springgreen",
  "#333333",
  "#333333",
  "#333333",
  "#333333",
  "#333333",
  "#333333",
  "#333333",
  "#333333"
]
let colorArray2 = [
  "tomato",
  "#333333",
  "#333333",
  "#333333",
  "#333333",
  "#333333",
  "#333333",
  "#333333",
  "#333333"
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
    return APIManager.get(
          `income?user_id=${sessionStorage.getItem("activeUser")}`
        ).then(
          income =>
            (newState.income = income.filter(income =>
              income
            ))
        )
      .then(() =>
        APIManager.get(
          `categories?user_id=${sessionStorage.getItem("activeUser")}`
        ).then(categories => {
          newState.categories = categories
          let currentDiff = [
            this.diff(this.sum(newState.income), this.sum(newState.categories))
          ]
          newState.chartData = {
            labels: ["Current Balance"].concat(this.makeArray(categories, "name")),
            datasets: [
              {
                data: currentDiff.concat(this.makeArray(categories, "amount")),
                backgroundColor:(currentDiff < 0) ? colorArray2 : colorArray
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
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  updateChart = () => {
    let newState = {}
    let currentDiff = [
      this.diff(this.sum(this.state.income), this.sum(this.state.categories))
    ]
    newState.chartData = {
      labels: ["Current Balance"].concat(
        this.makeArray(this.state.categories, "name")
      ),
      datasets: [
        {
          data: currentDiff.concat(
            this.makeArray(this.state.categories, "amount")
          ),
          backgroundColor: (currentDiff < 0) ? colorArray2 : colorArray
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
          path="/dashboard"
          render={props => <Redirect to="/" />}
        />
        <Route
          path="/login"
          render={props => <Login setUser={this.props.setUser} {...props} />}
        />
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Dashboard
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
                  chartData={this.state.chartData}
                  updateChart={this.updateChart}
                  thisMonth={thisMonth}
                  {...props}
                />
              )
            } else return <Redirect to="/login" />
          }}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)
