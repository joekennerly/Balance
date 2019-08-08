import React, { Component } from "react"
import { Grid } from "semantic-ui-react"

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
    let totalBalance = this.props.diff(totalIn, totalEx)
    let budgetBalance = this.props.diff(totalIn, totalCat)
    return (
      <Grid columns={3}>
        <Grid.Column textAlign="left">
          <h1>Income: ${totalIn}</h1>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <h1>Expenses: <span className="blue">${totalEx}</span>/${totalCat}</h1>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <h1>Balance: <span className="blue">${totalBalance}</span>/${budgetBalance}</h1>
        </Grid.Column>
      </Grid>
    )
  }
}
