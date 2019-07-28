import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"
import APIManager from "../modules/APIManager"

class ApplicationViews extends Component {

  state = {
    expenses: []
  }

  componentDidMount() {
    let newState = {}
    APIManager.get("expenses")
      .then(expenses => newState.expenses = expenses)
    .then(()=> this.setState(newState))
  }

  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser") !== null
  }

  setUser = activeUserId => {
    //return one user
    let newState = {}
    newState.activeUser = activeUserId
    this.setState(newState)
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) return <Dashboard expenses={this.state.expenses}{...props}/>
            else return <Redirect to="/login" />
          }}
        />
        <Route
          exact
          path="/login"
          render={props => {
            if (!this.isAuthenticated()) return <Login setUser={this.setUser} {...props} />
            else return <Redirect to="/" />
          }}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)
