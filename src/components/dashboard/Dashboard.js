import React, { Component } from "react"
import Header from "./Header"
import Totals from "./Totals"
import EntryForm from "./EntryForm"
import Expenses from "./Expenses"

export default class Dashboard extends Component {
  render() {
    return (
      <div className="ui container">
        <Header {...this.props}/>

        <Totals />

        <EntryForm />

        <Expenses />
      </div>
    )
  }
}
