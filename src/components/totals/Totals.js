import React, { Component } from "react"
import { Header, Table } from "semantic-ui-react"
let m = require("moment")

export default class Totals extends Component {
  state = {
    name: "",
    amount: ""
  }
  render() {
    let totalIn = this.props.sum(this.props.income)
    let totalEx = this.props.sum(this.props.expenses)
    let totalBalance = this.props.diff(totalIn, totalEx)
    let totalCat = this.props.sum(this.props.categories)
    // let budgetBalance = this.props.diff(totalIn, totalCat)
    return (
      <header>
        {/* <Input
          size="small"
          autoFocus
          id="name"
          placeholder="name"
          onChange={this.handleKeyPress}
        />

        <Input
          size="small"
          id="amount"
          type="number"
          placeholder="amount"
          onChange={this.handleKeyPress}
        />
        <Button onClick={this.addAndClose} ribbon="right">
          + Add Budget
        </Button> */}
        <Table inverted celled textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>{m().format("MMMM")}</Table.HeaderCell>
              <Table.HeaderCell>
                {m()
                  .add(1, "month")
                  .format("MMMM")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {m()
                  .add(2, "month")
                  .format("MMMM")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {m()
                  .add(3, "month")
                  .format("MMMM")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {m()
                  .add(4, "month")
                  .format("MMMM")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {m()
                  .add(5, "month")
                  .format("MMMM")}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header inverted>Total</Header>
              </Table.Cell>
              <Table.Cell>
                <Header inverted>${totalBalance}</Header>
              </Table.Cell>
              <Table.Cell>
                <Header inverted>${totalBalance - totalCat}</Header>
              </Table.Cell>
              <Table.Cell>
                <Header inverted>${totalBalance - totalCat * 2}</Header>
              </Table.Cell>
              <Table.Cell>
                <Header inverted>${totalBalance - totalCat * 3}</Header>
              </Table.Cell>
              <Table.Cell>
                <Header inverted>${totalBalance - totalCat * 4}</Header>
              </Table.Cell>
              <Table.Cell>
                <Header inverted>${totalBalance - totalCat * 5}</Header>
              </Table.Cell>
            </Table.Row>
            {this.props.categories.map(category => (
              <Table.Row key={category.id}>
                <Table.Cell>{category.name}</Table.Cell>
                <Table.Cell>
                  <span className="blue">$-{category.amount}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="blue">$-{category.amount}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="blue">$-{category.amount}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="blue">$-{category.amount}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="blue">$-{category.amount}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="blue">$-{category.amount}</span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </header>
    )
  }
}
