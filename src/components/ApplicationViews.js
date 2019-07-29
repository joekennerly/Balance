import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"
import APIManager from "../modules/APIManager"

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

  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser")
  }
  setUser = activeUserId => {
    //return one user
    let newState = {}
    newState.activeUser = activeUserId
    this.setState(newState)
  }

  deleteItem = (name, id, path) => {
    let newObj = {}
    return fetch(`http://localhost:5002/${name}/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => APIManager.getAll(`${name}`))
      .then(group => {
        newObj[name] = group
        this.setState(newObj)
        this.props.history.push(`${path}`)
      })
  }

  updateItem = (name, editedObject, path) => {
    let newObj = {}
    return APIManager.put(name, editedObject)
      .then(() => APIManager.getAll(`${name}`))
      .then(item => {
        newObj[name] = item
        this.setState(newObj)
      })
      .then(() => this.props.history.push(`${path}`))
  }

  addItem = (name, item, path) => {
    let newObj = {}
    APIManager.post(name, item)
      .then(() => APIManager.getAll(`${name}`))
      .then(items => {
        newObj[name] = items
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
          path="/login"
          render={props => {
            if (!this.isAuthenticated()) {
              return <Login setUser={this.setUser} {...props} />
            } else return <Redirect to="/" />
          }}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)
