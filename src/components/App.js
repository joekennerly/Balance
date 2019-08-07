import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import Nav from "./nav/Nav"
// import Login from "./login/Login"


export default class App extends Component {
  state = {
    activeUser: null,
    renderTrigger: false
  }



  componentDidMount() {
    let newState = {}
    newState.activeUser = +sessionStorage.getItem("activeUser")
    this.setState(newState)
  }

  isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

  setUser = (activeUserId) => {
    //return one user
    let newState = {}
    newState.activeUser = activeUserId
    this.setState(newState)
  }

  render() {

    console.log("APP user", this.state.activeUser)
    if (this.isAuthenticated()) {
      //if there is an active user
      return (
        <React.Fragment>
          <Nav setUser={this.setUser}/>
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
          {/* <Login /> */}
          <ApplicationViews
            activeUser={this.state.activeUser}
            setUser={this.setUser}
          />
        </React.Fragment>
      )
    }
  }
}
