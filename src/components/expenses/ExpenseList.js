import React, { Component } from "react"
import EntryForm from "../dashboard/EntryForm"
import { Grid, Button } from "semantic-ui-react"

export default class ExpenseList extends Component {
  render() {
    return (
      <Grid columns={5} onClick={this.toggleClick}>
        <Grid.Row>
          <EntryForm {...this.props} />
        </Grid.Row>
        {this.props.expenses.map(expense => (
          <Grid.Row key={expense.id}>
            <Grid.Column textAlign="center">
              <div id={`date-${expense.id}`}>{expense.date}</div>
              <input
                id={`edit-date-${expense.id}`}
                type="date"
                value={this.state.date}
                className="hide"
                onChange={this.handleKeyPress}
                onKeyPress={this.enterKey}
              />
            </Grid.Column>
            <Grid.Column textAlign="center">
              <div id={`category-${expense.id}`}>{expense.category}</div>
              <input
                id={`edit-category-${expense.id}`}
                type="text"
                value={this.state.category}
                className="hide"
                onChange={this.handleKeyPress}
                onKeyPress={this.enterKey}
              />
            </Grid.Column>
            <Grid.Column textAlign="center">
              <div id={`name-${expense.id}`}>{expense.name}</div>
              <input
                id={`edit-name-${expense.id}`}
                type="text"
                value={this.state.name}
                className="hide"
                onChange={this.handleKeyPress}
                onKeyPress={this.enterKey}
              />
            </Grid.Column>
            <Grid.Column textAlign="center">
              <div id={`amount-${expense.id}`}>{expense.amount}</div>
              <input
                id={`edit-amount-${expense.id}`}
                type="text"
                value={this.state.amount}
                className="hide"
                onChange={this.handleKeyPress}
                onKeyPress={this.enterKey}
              />
            </Grid.Column>
            <Button
              onClick={() =>
                this.props.deleteItem("expenses", expense.id, "/expenses")
              }
            >
              x
            </Button>
          </Grid.Row>
        ))}
      </Grid>
    )
  }
}
