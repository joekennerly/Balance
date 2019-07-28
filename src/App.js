import React, { Component }  from "react"
import "./App.css"
import Dashboard from "./components/dashboard/Dashboard"
import Login from "./components/login/Login"


export default class App extends Component {
  state = {
    id: ""
  }

  setUser = activeUserId => {
    //return one user
    let newState = {}
    newState.activeUser = activeUserId
    this.setState(newState)
  }

  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser") !== null
  }

  render() {
    if (sessionStorage.length === 0) {
      return (
        <React.Fragment>
          <Login setUser={this.setUser} />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Dashboard />
        </React.Fragment>
      )
    }
  }
}