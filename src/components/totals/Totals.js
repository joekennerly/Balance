import React, { Component } from "react"
import { Header, Table, Button, Dropdown, Input } from "semantic-ui-react"

export default class Totals extends Component {
  state = {
    name: "",
    amount: "",
    date: "",
    category_id:""
  }
  handleKeyPress = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
  makeObj = () => {
    return {
      name: this.state.name,
      amount: this.state.amount,
      date: this.state.date,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }
  add = (resource) => {
    if (this.state.name === "") {
      return window.alert("please enter a name")
    } else if (this.state.amount === "") {
      return window.alert("please enter an amount")
    } else if (this.state.date === "") {
      return window.alert("please enter a date")
    } else {
      this.props
        .addItem(resource, this.makeObj())
        .then(() => this.props.updateChart())
    }
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
                    <Input id="name" icon="file outline" onChange={this.handleKeyPress}/>
                    <Input id="amount" type="number" icon="usd" onChange={this.handleKeyPress}/>
                    <Input id="date" type="date" icon="calendar alternate outline" onChange={this.handleKeyPress}/>
                    <Button fluid onClick={()=>this.add("categories")}>Create</Button>
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
                    <Input id="name" icon="file outline" onChange={this.handleKeyPress}/>
                    <Input id="amount" type="number" icon="usd" onChange={this.handleKeyPress}/>
                    <Input id="date" type="date" icon="calendar alternate outline" onChange={this.handleKeyPress}/>
                    <Button fluid onClick={()=>this.add("income")}>Create</Button>
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
