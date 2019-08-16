import React, { Component } from "react"
import {
  Button,
  Header,
  Segment,
  Table,
  Dropdown,
  Input,
  Icon
} from "semantic-ui-react"

export default class Categories extends Component {
  state = {
    name: "",
    amount: "",
    date: "",
    category_id: ""
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
      date: this.state.date,
      category_id: this.state.category_id,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }
  // ADD / Delete
  add = resource => {
    if (this.state.name === "") {
      return window.alert("please enter a name")
    } else if (this.state.amount === "") {
      return window.alert("please enter an amount")
    } else {
      this.props
        .addItem(resource, this.makeObj())
        .then(() => this.props.updateChart())
    }
  }
  del = (resource, id) => {
    this.props.deleteItem(resource, id).then(() => this.props.updateChart())
  }
  setCategory = categoryId => this.setState({ category_id: categoryId })
  render() {
    console.log(this.state)
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
                <Table.HeaderCell>
                  <Dropdown item icon="ellipsis vertical" simple onClick={()=>this.setCategory(category.id)}>
                    <Dropdown.Menu>
                      <Header>
                        Add expense for {category.name}
                        <Button
                          floated="right"
                          negative
                          circular
                          size="tiny"
                          id={`category-${category.id}`}
                          onClick={() => this.del("categories", category.id)}
                        />
                      </Header>
                      <Input
                        id="name"
                        icon="file outline"
                        onChange={this.handleKeyPress}
                      />
                      <Input
                        id="amount"
                        type="number"
                        icon="usd"
                        onChange={this.handleKeyPress}
                      />
                      <Input
                        id="date"
                        type="date"
                        icon="calendar alternate outline"
                        onChange={this.handleKeyPress}
                      />
                      <Button fluid onClick={() => this.add("expenses")}>
                        Create
                      </Button>
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.expenses
                .filter(expenses => expenses.category_id === category.id)
                .map(expense => (
                  <Table.Row key={expense.id}>
                    <Table.Cell>${expense.amount}</Table.Cell>
                    <Table.Cell>{expense.name}</Table.Cell>
                    <Table.Cell>
                      <Icon as={Button} circular negative size="mini" name="times" onClick={() => this.del("expenses", expense.id)}/>
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
