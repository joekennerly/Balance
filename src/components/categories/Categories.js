import React, { Component } from "react"
import {
  Button,
  Header,
  Segment,
  Table,
  Dropdown,
  Input,
  Icon,
  Modal
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
    this.props.deleteItem(resource, id)
      .then(() => this.props.updateChart())
  }
  setCategory = categoryId => {
    let upObj = this.props.categories.find(cat => cat.id === categoryId)
    upObj.category_id = categoryId
    this.setState(upObj)
  }
  setExpense = id => {
    let upObj = this.props.expenses.find(exp => exp.category_id === id)
    this.setState(upObj)
  }

  update = (resource, id) => {
    console.log(resource, id)
    this.props
      .updateItem(resource, id, {
        date: this.state.date,
        name: this.state.name,
        amount: this.state.amount,
        user_id: +sessionStorage.getItem("activeUser")
      })
      .then(() => this.props.updateChart())
  }
  updateExp = (resource, id) => {
    console.log(resource, id)
    this.props
      .updateItem(resource, id, {
        date: this.state.date,
        category_id: this.state.category_id,
        name: this.state.name,
        amount: this.state.amount,
        user_id: +sessionStorage.getItem("activeUser")
      })
      .then(() => this.props.updateChart())
  }

  render() {
    return (
      <Segment>
          <Header size="huge" inverted>
            <Dropdown item icon="chevron down" simple>
              <Dropdown.Menu>
                <Header>Add Budget</Header>
                <Input id="name" icon="file outline" onChange={this.handleKeyPress} />
                <Input id="amount" type="number" icon="usd" onChange={this.handleKeyPress} />
                <Input id="date" type="date" icon="calendar alternate outline" onChange={this.handleKeyPress} />
                <Button fluid onClick={() => this.add("categories")}>Create</Button>
              </Dropdown.Menu>
            </Dropdown>
          </Header>
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
                    {/* $
                    {this.props.sum(
                      this.props.expenses.filter(
                        exp => exp.category_id === category.id
                      )
                    )} */}
                    ${category.amount}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell>

                  <Modal trigger={<Button id={`edit-${category.id}`} size="small" onClick={() => this.setCategory(category.id)}>Edit</Button>}>
                    <Header icon='edit' content={`Edit ${this.state.name}...`} />
                    <Modal.Content>
                      <Input
                        fluid
                        id="name"
                        icon="file outline"
                        value={this.state.name}
                        onChange={this.handleKeyPress}
                      />
                      <Input
                        fluid
                        id="amount"
                        type="number"
                        icon="usd"
                        value={this.state.amount}
                        onChange={this.handleKeyPress}
                      />
                      <Input
                        fluid
                        id="date"
                        type="date"
                        icon="calendar alternate outline"
                        value={this.state.date}
                        onChange={this.handleKeyPress}
                      />
                    </Modal.Content>
                    <Modal.Actions>
                      <Button basic color="green" onClick={() => this.update("categories", category.id)}>
                        Change
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  <Modal trigger={<Button negative size="small" id={`delete-${category.id}`} onClick={() => this.setCategory(category.id)}>Delete</Button>} size='mini'>
                    <Header icon='trash' content={`Are you sure you want to delete ${this.state.name} and all of it's expenses?`} />
                    <Modal.Actions>
                      <Button basic negative onClick={() => this.props.deleteCat(category.id)}>
                        Delete
                      </Button>
                      <Button basic onClick={() => console.log("cancel")}>
                        Cancel
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  {/* <Dropdown id={`options-${category.id}`} as={Button} positive icon="plus" simple onClick={() => this.setCategory(category.id)}>
                    <Dropdown.Menu>
                      <Header size="huge">
                        Add expense for {category.name}
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
                      <Button size="large" fluid onClick={() => this.add("expenses")}>
                        Create
                      </Button>
                    </Dropdown.Menu>
                  </Dropdown> */}
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
                      <Modal trigger={<Button id={`edit-${expense.id}`} size="mini" onClick={() => this.setExpense(category.id)}>Edit</Button>} size='mini'>
                        <Header icon='edit' content={`Edit ${this.state.name}...`} />
                        <Modal.Content>
                          <Input
                            fluid
                            id="name"
                            icon="file outline"
                            value={this.state.name}
                            onChange={this.handleKeyPress}
                          />
                          <Input
                            fluid
                            id="amount"
                            type="number"
                            icon="usd"
                            value={this.state.amount}
                            onChange={this.handleKeyPress}
                          />
                          <Input
                            fluid
                            id="date"
                            type="date"
                            icon="calendar alternate outline"
                            value={this.state.date}
                            onChange={this.handleKeyPress}
                          />
                        </Modal.Content>
                        <Modal.Actions>
                          <Button basic circular color="green" onClick={(event) => this.updateExp("expenses", expense.id)}>
                            Change
                      </Button>
                        </Modal.Actions>
                      </Modal>
                      <Icon as={Button} negative size="mini" content="Delete" onClick={() => this.del("expenses", expense.id)} />
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
