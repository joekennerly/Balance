import React, { Component } from "react"
import { Header, Table } from "semantic-ui-react"
let m = require("moment")

export default class Totals extends Component {
  render() {
    let totalIn = this.props.sum(this.props.income)
    let totalEx = this.props.sum(this.props.expenses)
    let totalBalance = this.props.diff(totalIn, totalEx)
    // let totalCat = this.props.sum(this.props.categories)
    // let budgetBalance = this.props.diff(totalIn, totalCat)
    return (
      <Table inverted celled textAlign="center">

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Current</Table.HeaderCell>
            <Table.HeaderCell>
              <Header size="huge" inverted textAlign="center">
                ${totalIn}
              </Header>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Header size="huge" inverted textAlign="center">
                <span className="blue">${totalBalance}</span>
              </Header>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Header size="huge" inverted textAlign="center">
                <span className="blue">${totalEx}</span>
              </Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{m().add(1, "month").format("MMMM")}</Table.Cell>
            <Table.Cell>$1300</Table.Cell>
            <Table.Cell>$2000</Table.Cell>
            <Table.Cell>$3000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{m().add(2, "month").format("MMMM")}</Table.Cell>
            <Table.Cell>$1300</Table.Cell>
            <Table.Cell>$2000</Table.Cell>
            <Table.Cell>$3000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{m().add(3, "month").format("MMMM")}</Table.Cell>
            <Table.Cell>$1300</Table.Cell>
            <Table.Cell>$2000</Table.Cell>
            <Table.Cell>$3000</Table.Cell>
          </Table.Row>
        </Table.Body>

      </Table>
    )
  }
}
