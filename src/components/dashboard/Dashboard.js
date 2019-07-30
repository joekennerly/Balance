import React, { Component } from "react"
import Header from "./Header"
import Totals from "./Totals"
import Expenses from "./Expenses"

export default class Dashboard extends Component {
  render() {
    return (
      <div className="ui centered grid">
        <article className="row">
          <Header {...this.props}/>
        </article>
        <article className="row">
          <Totals {...this.props}/>
        </article>
        <article className="row">
          <Expenses {...this.props} />
        </article>
      </div>
    )
  }
}
