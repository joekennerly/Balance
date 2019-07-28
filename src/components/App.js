import React, { Component }  from "react"
import "./App.css"
import ApplicationViews from "./ApplicationViews"
import Login from "./login/Login"


export default class App extends Component {
  state = {
    id: ""
  }

  setUser = activeUserId => {
    //return one user
    //Add activeUser to state
    let newState = {}
    newState.activeUser = activeUserId
    this.setState(newState)
  }

  isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

  render() {
    if (this.isAuthenticated()) {
      return (
        <React.Fragment>
          <Login
            activeUser={this.state.activeUser}
            setUser={this.setUser} />
        </React.Fragment>
      )
    } else {
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
