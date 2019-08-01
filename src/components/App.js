import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import Nav from "./nav/Nav"


export default class App extends Component {
  state = {
    activeUser: ""
  }

  isAuthenticated = () => sessionStorage.getItem("activeUser")

  setUser = activeUserId => {
    //return one user
    let newState = {}
    newState.activeUser = activeUserId
    this.setState(newState)
  }

  render() {
    if (this.isAuthenticated()) {
      //if there is an active user
      return (
        <React.Fragment>
          <Nav />
          <ApplicationViews
            activeUser={this.state.activeUser}
            setUser={this.setUser}
          />
        </React.Fragment>
      )
    } else {
      // there is no active user
      return (
        <React.Fragment>
          <ApplicationViews
            activeUser={this.state.activeUser}
            setUser={this.setUser}
          />
        </React.Fragment>
      )
    }
  }
}
