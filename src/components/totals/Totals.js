import React, { Component } from "react"
import { Header, Table } from "semantic-ui-react"

export default class Totals extends Component {
  render() {
    let totalIn = this.props.sum(this.props.income)
    let totalCat = this.props.sum(this.props.categories)
    let budgetBalance = this.props.diff(totalIn, totalCat)
    return (
      <Table inverted celled textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <Header size="huge" inverted>
                Budget: ${totalCat}
              </Header>
            </Table.Cell>

            <Table.Cell>
              <Header size="huge" inverted>
                Balance: ${budgetBalance}
              </Header>
            </Table.Cell>

            <Table.Cell>
              <Header size="huge" inverted>
                Income: ${totalIn}
              </Header>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>
    )
  }
}
