import React, { Component } from "react"
import { Header, Segment } from "semantic-ui-react"

export default class Totals extends Component {
  render() {
    let totalCat
    if (!this.props.category) {
      totalCat = this.props.sum(this.props.categories)
    } else {
      totalCat = this.props.category.amount
    }
    let totalIn = this.props.sum(this.props.income)
    let totalEx = this.props.sum(this.props.expenses)
    // let totalBalance = this.props.diff(totalIn, totalEx)
    // let budgetBalance = this.props.diff(totalIn, totalCat)
    return (
      <Segment.Group horizontal>
        <Segment textAlign="center">
          <Header size="huge">Income: ${totalIn}</Header>
        </Segment>
        <Segment textAlign="center">
          <Header size="huge">Expenses: <span className="blue">${totalEx}</span>/${totalCat}</Header>
        </Segment>
        {/* <Segment textAlign="center">
          <Header size="huge">Balance: <span className="blue">${totalBalance}</span>/${budgetBalance}</Header>
        </Segment> */}
      </Segment.Group>
    )
  }
}
