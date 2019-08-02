import React, { Component } from "react"
import APIManager from "../modules/APIManager"
import ApplicationViews from "./ApplicationViews"
import Nav from "./nav/Nav"


export default class App extends Component {
  state = {
    expenses: [],
    income: [],
    categories: [],
    activeUser: ""
  }
  componentDidMount() {
    let newState = {}
    APIManager.get("expenses")
      .then(expenses => (newState.expenses = expenses))
      .then(() =>
        APIManager.get("income").then(income => (newState.income = income))
      )
      .then(() =>
        APIManager.all("categories").then(categories => (newState.categories = categories))
      )
      .then(() => this.setState(newState))
  }

  sum = (entryArray) => {
    let total = 0
    entryArray.forEach(entry => total += +entry.amount)
    return total.toFixed(2)
  }
  diff = (inTotal, exTotal) => (inTotal - exTotal).toFixed(2)

  // state = {
  //   activeUser: ""
  // }

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
          <Nav
            sum={this.sum}
            diff={this.diff}
            {...this.state}
          />
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
