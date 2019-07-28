import React, { Component } from "react"
// import Header from "./Header"
// import Totals from "./Totals"
import EntryForm from "./EntryForm"
import Expenses from "./Expenses"

export default class Dashboard extends Component {
  render() {
    return (
      <div className="ui centered grid">
        {/* <article className="row">
          <Totals />
        </article> */}
        <article className="row">
          <EntryForm />
        </article>
        <article className="row">
          <Expenses expenses={this.props.expenses} />
        </article>
      </div>
    )
  }
}
