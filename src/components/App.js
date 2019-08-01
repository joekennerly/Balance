import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import Nav from "./nav/Nav"


export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <ApplicationViews />
      </React.Fragment>
    )
  }
}
