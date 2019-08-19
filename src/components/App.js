import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import Nav from "./nav/Nav"
import { Container } from "semantic-ui-react"

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
        <Container fluid>
          <style>
            {`
              html, body {
                background-color: #252839 !important;
              }
            `}
          </style>
          <Nav activeUser={this.state.activeUser} setUser={this.setUser} />
          <ApplicationViews
            activeUser={this.state.activeUser}
            setUser={this.setUser}
          />
        </Container>
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
