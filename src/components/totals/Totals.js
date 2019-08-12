import React, { Component } from "react"
import { Segment, Header } from "semantic-ui-react"

export default class Totals extends Component {
  render() {
    let totalIn = this.props.sum(this.props.income)
    let totalCat = this.props.sum(this.props.categories)
    let totalEx = this.props.sum(this.props.expenses)
    let totalBalance = this.props.diff(totalIn, totalEx)
    let budgetBalance = this.props.diff(totalIn, totalCat)
    return (
      <Segment.Group horizontal>
        <Segment>
          <Header size="huge" textAlign="center">Income: ${totalIn}</Header>
        </Segment>
        <Segment>
          <Header size="huge" textAlign="center">Expenses: <span className="blue">${totalEx}</span>/${totalCat}</Header>
        </Segment>
        <Segment>
          <Header size="huge" textAlign="center">Balance: <span className="blue">${totalBalance}</span>/${budgetBalance}</Header>
        </Segment>
      </Segment.Group>
    )
  }
}
