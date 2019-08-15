import React, { Component } from "react"
import {
  Button,
  Header,
  Segment,
  Table,
  Icon,
  Input,
  Dropdown,
  Menu
} from "semantic-ui-react"

export default class Categories extends Component {
  state = {
    name: "",
    amount: ""
  }
  //Save current value when changed
  handleKeyPress = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
  handleEdit = event => {
    const stateToChange = {}
    stateToChange[event.target.id.split("-")[1]] = event.target.value
    this.setState(stateToChange)
  }
  //Factory function
  makeObj = () => {
    return {
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }
  // ADD / Delete
  addAndClose = () => {
    if (this.state.name === "") {
      return window.alert("please enter a name")
    } else if (this.state.amount === "") {
      return window.alert("please enter an amount")
    } else {
      this.props
        .addItem("categories", this.makeObj())
        .then(() => this.props.updateChart())
    }
  }
  del = id => {
    this.props.deleteItem("categories", id).then(() => this.props.updateChart())
  }
  render() {
    return (
      <Segment>
        {this.props.categories.map(category => (
          <Table inverted key={category.id}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Header size="large" inverted id={`name-${category.id}`}>
                    {category.name}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Header size="large" inverted id={`amount-${category.id}`}>
                    $
                    {this.props.sum(
                      this.props.expenses.filter(
                        exp => exp.category_id === category.id
                      )
                    )}
                    /${category.amount}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell>
                  <Button
                    positive
                    circular
                    size="tiny"
                    id={`category-${category.id}`}
                    onClick={() => this.del(category.id)}
                  />
                  <Button
                    negative
                    circular
                    size="tiny"
                    id={`category-${category.id}`}
                    onClick={() => this.del(category.id)}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.expenses
                .filter(expenses => expenses.category_id === category.id)
                .map(expense => (
                  <Table.Row key={expense.id}>
                    <Table.Cell>${expense.amount}</Table.Cell>
                    <Table.Cell>- {expense.name}</Table.Cell>
                    <Table.Cell>{expense.date}</Table.Cell>
                    <Table.Cell>
                      <Button basic circular positive size="mini" />
                      <Button basic circular negative size="mini" />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        ))}
      </Segment>
    )
  }
}
