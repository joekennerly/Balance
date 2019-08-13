import React, { Component } from "react"
import { Segment, Header, Table } from "semantic-ui-react"

export default class Totals extends Component {
  render() {
    let totalIn = this.props.sum(this.props.income)
    let totalCat = this.props.sum(this.props.categories)
    let totalEx = this.props.sum(this.props.expenses)
    let totalBalance = this.props.diff(totalIn, totalEx)
    let budgetBalance = this.props.diff(totalIn, totalCat)
    return (
      <Table inverted celled>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Header size="huge" inverted textAlign="center">
                Income: ${totalIn}
              </Header>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Header size="huge" inverted textAlign="center">
                Balance: <span className="blue">${totalBalance}</span>
              </Header>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Header size="huge" inverted textAlign="center">
                Expenses: <span className="blue">${totalEx}</span>
              </Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

      </Table>
    )
  }
}
