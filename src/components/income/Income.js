import React, { Component } from "react"
import { Button, Header, Segment, Table, Icon, Modal, Input } from "semantic-ui-react"

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
      <Segment.Group
        as={Segment}
        inverted
        horizontal
        onClick={this.toggleClick}
      >
        <Segment inverted textAlign="right">
          {this.props.income.map(inco => (
            <Table inverted key={inco.id}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">
                    <Header size="large" inverted id={`name-${inco.id}`}>
                      {inco.name}
                    </Header>
                    <input
                      id={`edit-name-${inco.id}`}
                      type="text"
                      value={this.state.name}
                      className="hide"
                      onChange={this.handleKeyPress}
                      onKeyPress={this.enterKey}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    <Header size="large" inverted id={`amount-${inco.id}`}>
                      {inco.amount}
                    </Header>
                    <input
                      id={`edit-amount-${inco.id}`}
                      type="text"
                      value={this.state.amount}
                      className="hide"
                      onChange={this.handleKeyPress}
                      onKeyPress={this.enterKey}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Modal trigger={<Button id={`edit-${inco.id}`} onClick={() => this.setIncome(inco.id)}>Edit</Button>} size='mini'>
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
                      circular
                      negative
                      size="mini"
                      onClick={() =>
                        this.props
                          .deleteItem("income", inco.id)
                          .then(() => this.props.updateChart())
                      }
                    />
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row id={`date-${inco.id}`}>
                  <Table.Cell>
                    {inco.date}
                    <input
                      id={`edit-date-${inco.id}`}
                      type="date"
                      value={this.state.date}
                      className="hide"
                      onChange={this.handleKeyPress}
                      onKeyPress={this.enterKey}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
            </Table>
          ))}
        </Segment>
      </Segment.Group>
    )
  }
}
