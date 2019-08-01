import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import APIManager from "../modules/APIManager"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"
import Budget from "./budget/Budget"

let moment = require("moment")
class ApplicationViews extends Component {
  state = {
    expenses: [],
    income: []
  }
  componentDidMount() {
    let newState = {}
    APIManager.get("expenses")
      .then(expenses => (newState.expenses = expenses))
      .then(() =>
        APIManager.get("income").then(income => (newState.income = income))
      )
      .then(() => this.setState(newState))
  }

  isAuthenticated = () => sessionStorage.getItem("activeUser")

  setUser = activeUserId => {
    //return one user
    let newState = {}
    newState.activeUser = activeUserId
    this.setState(newState)
  }

  deleteItem = (resource, id, path) => {
    let newObj = {}
    return fetch(`http://localhost:5002/${resource}/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => APIManager.getAll(`${resource}`))
      .then(group => {
        newObj[resource] = group
        this.setState(newObj)
        this.props.history.push(`${path}`)
      })
  }

  updateItem = (resource, id, editedObject, path) => {
    let newObj = {}
    return APIManager.put(resource, id, editedObject)
      .then(() => APIManager.getAll(`${resource}`))
      .then(item => {
        newObj[resource] = item
        this.setState(newObj)
      })
      .then(() => this.props.history.push(`${path}`))
  }

  addItem = (resource, item, path) => {
    let newObj = {}
    return APIManager.post(resource, item)
      .then(() => APIManager.getAll(`${resource}`))
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
      .then(() => this.props.history.push("/"))
      .then(() => this.props.history.push(`${path}`))
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
          exact
          path="/login"
          render={props => {
            if (!this.isAuthenticated()) {
              return <Login setUser={this.setUser} {...props} />
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
                  addItem={this.addItem}
                  deleteItem={this.deleteItem}
                  updateItem={this.updateItem}
                  income={this.state.income}
                  expenses={this.state.expenses}
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
              return <Budget {...props} />
            } else return <Redirect to="/login" />
          }}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)
