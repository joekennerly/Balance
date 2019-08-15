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
    console.log("APP user", this.state.activeUser)
    if (this.isAuthenticated()) {
      //if there is an active user
      return (
        <Container fluid>
          {/* Heads up! We apply there some custom styling, you usually will not need it. */}
          <style>
            {`
              html, body {
                background-color: #252839 !important;
              }
              p {
                align-content: center;
                background-color: #495285;
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 6em;
              }
              p > span {
                opacity: 0.4;
                text-align: center;
              }
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
