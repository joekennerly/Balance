import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"

class ApplicationViews extends Component {

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
            if (this.isAuthenticated()) return <Dashboard {...props}/>
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
