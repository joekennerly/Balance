import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import APIManager from "../modules/APIManager"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"
import Budget from "./budget/Budget"
import Expenses from "./expenses/Expenses"
import Income from "./income/Income"
import { Container } from "semantic-ui-react"

let moment = require("moment")
class ApplicationViews extends Component {
  state = {
    expenses: [],
    income: [],
    categories: [],
    chartData: {},
  }

  componentDidMount() {
    let newState = {}
    APIManager.get(`expenses?user_id=${sessionStorage.getItem("activeUser")}`)
      .then(expenses => (newState.expenses = expenses))
      .then(() =>
        APIManager.get(`income?user_id=${this.props.activeUser}`).then(income => (newState.income = income))
      )
      .then(() =>
        APIManager.get(`categories?user_id=${this.props.activeUser}`).then(categories => {
          newState.categories = categories
          newState.chartData = {
            labels: this.makeArray(categories, "name"),
            datasets: [
              {
                data: this.makeArray(categories, "amount"),
                backgroundColor: [
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "indigo",
                  "violet"
                ]
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
    return fetch(`http://localhost:5002/${resource}/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`))
      .then(group => {
        newObj[resource] = group
        this.setState(newObj)
      })
  }
  updateItem = (resource, id, editedObject) => {
    let newObj = {}
    return APIManager.put(resource, id, editedObject)
      .then(() => APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`))
      .then(item => {
        newObj[resource] = item
        this.setState(newObj)
      })
  }
  addItem = (resource, item) => {
    let newObj = {}
    return APIManager.post(resource, item)
      .then(() => APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`))
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }

  render() {
    // console.log(this.props)
    return (
      <React.Fragment>
        <Container>
          <Route
            exact
            path="/"
            render={props => {
              return <Redirect to="/dashboard" />
            }}
          />
          <Route
          exact
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
                    addItem={this.addItem}
                    deleteItem={this.deleteItem}
                    updateItem={this.updateItem}
                    income={this.state.income}
                    expenses={this.state.expenses}
                    categories={this.state.categories}
                    date={moment()}
                    chartData={this.state.chartData}
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
                    {...props}
                  />
                )
              } else return <Redirect to="/login" />
            }}
          />
          <Route
            exact
            path="/budget"
            render={props => {
              if (this.isAuthenticated()) {
                return (
                  <Budget
                    sum={this.sum}
                    diff={this.diff}
                    addItem={this.addItem}
                    deleteItem={this.deleteItem}
                    updateItem={this.updateItem}
                    income={this.state.income}
                    expenses={this.state.expenses}
                    categories={this.state.categories}
                    date={moment()}
                    {...props}
                  />
                )
              } else return <Redirect to="/login" />
            }}
          />
        </Container>
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)
