import React, { Component } from "react"
import { Header, Table, Icon, Dropdown, Input } from "semantic-ui-react"
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
      <Table inverted celled textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <Header size="huge" inverted>
                ${totalCat}
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Header size="huge" inverted>
                <Dropdown item icon="chevron down" direction="right" simple>
                  <Dropdown.Menu>
                    <Header>Add Budget</Header>
                    <Input icon="file outline" />
                    <Input type="number" icon="usd" />
                    <Input type="date" icon="calendar alternate outline" />
                    <Dropdown.Item>Create</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Header size="huge" inverted>
                ${totalBalance}
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Header size="huge" inverted>
              <Dropdown item icon="chevron up" simple>
                <Dropdown.Menu>
                    <Header>Add Income</Header>
                  <Input icon="folder open outline" />
                  <Input type="number" icon="usd" />
                  <Input type="date" icon="calendar alternate outline" />
                  <Dropdown.Item>Create</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Header size="huge" inverted>
                ${totalIn}
              </Header>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>
    )
  }
}
