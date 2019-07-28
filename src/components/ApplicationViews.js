import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"

class ApplicationViews extends Component {

  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser") !== null
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
            return <Login setUser={this.props.setUser} {...props} />
          }}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)
