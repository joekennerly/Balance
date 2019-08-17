import React, { Component } from "react"
import { Button, Header, Segment, Table, Dropdown, Icon, Modal, Input } from "semantic-ui-react"

export default class Income extends Component {
  state = {
    date: "",
    name: "",
    amount: ""
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
      date: this.state.date,
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }
  setIncome = id => {
    let upObj = this.props.income.find(inc => inc.id === id)
    this.setState(upObj)
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

  render() {
    return (
      <React.Fragment>

        <Segment>

          <Header size="huge" inverted>
            <Dropdown item icon="chevron up" simple>
              <Dropdown.Menu>
                <Header>Add Income</Header>
                <Input id="name" icon="file outline" onChange={this.handleKeyPress} />
                <Input id="amount" type="number" icon="usd" onChange={this.handleKeyPress} />
                <Input id="date" type="date" icon="calendar alternate outline" onChange={this.handleKeyPress} />
                <Button fluid onClick={() => this.add("income")}>Create</Button>
              </Dropdown.Menu>
            </Dropdown>
          </Header>
        </Segment>
        <Segment inverted textAlign="right">
          {this.props.income.map(inco => (
            <Table inverted key={inco.id}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">
                    <Header size="large" inverted id={`name-${inco.id}`}>
                      {inco.name}
                    </Header>

                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    <Header size="large" inverted id={`amount-${inco.id}`}>
                      {inco.amount}
                    </Header>

                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Modal trigger={<Button size="small" id={`edit-${inco.id}`} onClick={() => this.setIncome(inco.id)}>Edit</Button>} size='mini'>
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
                        <Button basic color="green" onClick={(event) => this.update("income", inco.id)}>
                          Change
                      </Button>
                      </Modal.Actions>
                    </Modal>
                    <Icon
                      as={Button}
                      negative
                      size="small"
                      content="delete"
                      onClick={() =>
                        this.props
                          .deleteItem("income", inco.id)
                          .then(() => this.props.updateChart())
                      }
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          ))}
        </Segment>
      </React.Fragment>
    )
  }
}
